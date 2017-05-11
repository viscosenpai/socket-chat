const models = require('../models');
const express = require('express');
const router = express.Router();

/* post users listening */
router.post('/', (req, res) => {
  models.users.create({
    username: req.body.username,
    password: req.body.password
  }).then(result => {
    res.status(201);
    res.redirect('chat');
  }).catch(err => {
    res.status(409);
    res.send(err);
  });
});

module.exports = router;