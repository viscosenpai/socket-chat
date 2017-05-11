const express = require('express');
const router = express.Router();
const models = require('../models');

// Get home page
router.get('/', (req, res, next) => {
  models.chat.findAll().then(result => {
    if (result && result.length > 0) {
      console.log(result);
      res.render('chat', { posts: result });
    } else {
      res.render('chat');
    }
  }).catch(err => {
    res.status(409);
    res.json(err);
  });
});

module.exports = router;