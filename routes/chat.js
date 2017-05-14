const express = require('express');
const router = express.Router();
const models = require('../models');

// Get home page
router.get('/', (req, res, next) => {
  if (isSessionExist(req)) {
    models.chat.findAll().then(result => {
      if (result && result.length > 0) {
        console.log('posts is exist');
        res.render('chat', { posts: result });
      } else {
        console.log('posts is unexist');
        createInitialPost(models, req, res);
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

function createInitialPost (models, req, res) {
  models.chat.create({
    post: 'Socket.IO Chatへようこそ',
    username: 'System'
  }).then(() => {
    models.chat.findAll().then(result => {
      console.log('created initialPost');
      res.render('chat', { posts: result });
    });
  }).catch(err => {
    res.status(409);
    res.send(err);
  });
}

module.exports = router;