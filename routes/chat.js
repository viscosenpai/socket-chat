const express = require('express');
const router = express.Router();
const models = require('../models');

// Get home page
router.get('/', (req, res, next) => {
  if (isSessionExist(req)) {
    models.chat.findAll().then(result => {
      if (result && result.length > 0) {
        res.render('chat', { posts: result });
      } else {
        res.render('chat', createInitialPost(models));
      }
    }).catch(err => {
      res.status(409);
      res.json(err);
    });
  } else {
    res.render('login');
  }
});

function isSessionExist (req) {
  let result = false;
  if (req.session.userName) {
    result = true;
  }
  return result;
}

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