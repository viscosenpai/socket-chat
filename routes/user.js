const models = require('../models');
const password = require('../password');
const express = require('express');
const router = express.Router();

/* post users listening */
router.post('/', (req, res) => {
  const hash = password.createHash(req.body.password);
  models.users.create({
    username: req.body.username,
    password: hash
  }).then(result => {
    res.status(201);
    res.redirect('chat');
  }).catch(err => {
    res.status(409);
    res.send(err);
  });
});

module.exports = router;