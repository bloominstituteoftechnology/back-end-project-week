const express = require('express');

const User = require('./User.js');

const router = express.Router();

router
  .route('/')
  .post((req, res) => {
    if (req.body.username && req.body.password) {
      const newUser = new User(req.body);
      newUser
        .save()
        .then(saved => {
          res.status(201).json(saved);
        })
        .catch(err => {
          res.status(500).json(err);
        });
    } else {
      res.status(422).json('provide a username and password!');
    }
  })

  module.exports = router;