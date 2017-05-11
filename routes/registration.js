const express = require("express");
const router = express.Router();

router.get('/', (req, res, next) => {
  res.render('registration');
});

module.exports = router;