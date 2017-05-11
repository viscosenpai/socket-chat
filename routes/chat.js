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
      res.render('chat', createInitialPost(models));
    }
  }).catch(err => {
    res.status(409);
    res.json(err);
  });
});

function createInitialPost (models) {
  models.chat.create({
    post: 'Socket.IO Chatへようこそ'
  }).then(result => {
    return result;
  }).catch(err => {
    res.status(409);
    res.send(err);
  });
}

module.exports = router;