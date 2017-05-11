const express = require('express');
const router = express.Router();
// const mongoose = require('mongoose');
const passport = require('passport');
// const LocalStrategy = require('passport-local').Strategy;

// passport.use(new LocalStrategy({
//     usernameField: 'id',
//     passwordField: 'password'
//   }, (req, id, password, done) => {
//     const User = mongoose.model('User');
//     console.log(req.body.id);
//     User.findOne({'id': id}, (err, user) => {
//       if (err) {
//         console.log(err);
//         return done(err);
//       }
//       if (!user || !user.validPassword(password)) {
//         return done(null, false);
//       }
//       return done(null, user);
//     });
//   }
// ));

// get method
router.get('/', (req, res, next) => {
  res.render('login');
  console.log('OK');
});

// post method
// router.post('/', (req, res, next) => {
//   const Users = mongoose.model('User');
//   const id = req.body.id;
//   const pass = req.body.password;
//   Users.findOne({'id': id}, (err, user) => {
//     if (err) {
//       console.log(err);
//     } else {
//       if (user.password === pass) {
//         req.session.username = id;
//         res.render('index', {name: req.session.username});
//       } else {
//         console.log('Password is incorrect');
//         res.render('login');
//       }
//     }
//   });
// });
router.post('/', passport.authenticate(
  'local-login', {
    successRedirect: 'chat',
    failureRedirect: 'login'
  }
));

module.exports = router;