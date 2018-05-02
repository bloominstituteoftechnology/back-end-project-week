const express = require('express');

const User = require('./User.js');

const router = express.Router();

router
  .route('/')
  .get((req, res) => {
    if (!req.session.auth) res.status(422).json('not allowed');
    if (req.session.auth) res.status(200).json({ _id: req.session._id });
  })
  .post((req, res) => {
    if (!(req.body.username && req.body.password)) {
      res.status(422).json({ error: 'provide username and password' });
    } else {
      User.create({
        username: req.body.username.toLowerCase(),
        password: req.body.password,
      })
        .then(saved => res.status(201).json(saved))
        .catch(error => res.status(500).json(error));
    }
  });

router.route('/login').post((req, res) => {
  if (!(req.body.username && req.body.password)) {
    res.status(422).json({ error: 'provide username and password' });
  } else {
    User.findOne({ username: req.body.username.toLowerCase() })
      .then(user => {
        if (user) {
          user
            .isPasswordValid(req.body.password)
            .then(response => {
              if (response) {
                res.status(200).json({ success: true });
              } else res.status(422).json({ success: false });
            })
            .catch(error => res.status(422).json({ success: false }));
        } else res.status(404).json('user not found');
      })
      .catch(error => res.status(500).json(error));
  }
});

router.route('/logout').post((req, res) => {
  req.session.regenerate(err => res.json(err));
  res.status(200).json('logged out');
});

module.exports = router;
