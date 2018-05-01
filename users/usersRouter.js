const express = require('express');

const User = require('./User.js');

const router = express.Router();

router
  .route('/')
  .post((req, res) => {
    if (!(req.body.username && req.body.password)) {
      res.status(422).json({ error: 'provide username and password' });
    } else {
      User.create({
        username: req.body.username.toLowerCase(),
        password: req.body.password
      })
        .then(saved => res.status(201).json(saved))
        .catch(error => res.status(500).json(error));
    }
  })

router
  .route('/login')
  .post((req, res) => {
    if (!(req.body.username && req.body.password)) {
      res.status(422).json({ error: 'provide username and password' });
    } else {
      User.findOne({ username: req.body.username.toLowerCase() })
        .then((user) => {
          if (user) {
            user
              .isPasswordValid(req.body.password)
              .then((response) => {
                if (response) {
                  res.status(200).json({ success: true });
                } else res.status(422).json({ success: false });
              })
              .catch(error => res.status(422).json({ success: false }));
          } else res.status(404).json('user not found');
        })
        .catch(error => res.status(500).json(error));
    }
  })

  module.exports = router;