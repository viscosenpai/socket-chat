const express = require('express');
const app = express();
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const helmet = require('helmet');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const models = require('./models');
const password = require('./password');

// passport がユーザ情報をシリアライズすると呼び出される
passport.serializeUser((user, done) => {
  console.log(user.username)
  done(null, user.username);
});

// passport がユーザ情報をデシリアライズすると呼び出される
passport.deserializeUser((username, done) => {
  models.users.findOne({
    where: {
      username: username
    }
  }).then(result => {
    done(null, result);
  }).catch(err => {
    return done(err)
  });
});

// passport における具体的な認証処理を設定する
passport.use(
  'local-login',
  new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
  }, (req, username, pass, done) => {
    process.nextTick(() => {
      models.users.findOne({
        where: {
          username: username
        }
      }).then(result => {
        if (result && password.check(pass, result.password)) {
          return done(null, result);
        } else {
          return done(null, false, req.flash('message', 'Invalid username or password.'));
        }
      }).catch(err => {
        return done(err);
      });
    });
  })
);

// 認可処理 指定されたロールを持っているかどうか判定する
const authorize = (role) => {
  return (req, res, next) => {
    if (req.isAuthenticated() && req.user.role === role) {
      return next();
    }
    res.redirect('/login');
  }
}

// controllerの定義
const index = require('./routes/index');
const user = require('./routes/user');
const login = require('./routes/login');
const chat = require('./routes/chat');
const registration = require('./routes/registration');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// ミドルウェアの設定
app.use(helmet());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(flash());
app.use(express.static(path.join(__dirname, 'public')));

// passport設定
const sessionMiddleware = session({
  secret: 'secret',
  store: new SequelizeStore({
    db: models.sequelize,
    table: 'sessions'
  }),
  resave: true,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    secure: false,
    maxAge: 1000 * 60 * 30
  }
});
app.use(sessionMiddleware);
app.session = sessionMiddleware;
app.use(passport.initialize());
app.use(passport.session());

app.use('/user', user);
app.use('/', index);
app.use('/login', login);
app.use('/chat', chat);
app.use('/registration', registration);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;