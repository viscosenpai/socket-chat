const express = require('express');
const router = express.Router();
const passport = require('passport');

// get method
router.get('/', (req, res, next) => {
  res.render('login');
  console.log('OK');
});

router.post('/', passport.authenticate(
  'local-login', {
    successRedirect: 'chat',
    failureRedirect: 'login'
  }
));

module.exports = router;