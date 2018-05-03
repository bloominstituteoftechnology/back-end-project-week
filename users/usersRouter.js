const express = require('express');

const User = require('./User.js');

const router = express.Router();

router
  .route('/')
  .get((req, res) => {
    if (!req.session.auth) res.status(422).json('not logged in');
    if (req.session._id) res.status(200).json({success: true, _id: req.session._id, username: req.session.username});
  })
  .post((req, res) => {
    if (!(req.body.username && req.body.password)) {
      res.status(422).json({ error: 'provide username and password' });
    } else {
      User.create({
        username: req.body.username.toLowerCase(),
        password: req.body.password
      })
        .then(saved => {
          req.session.auth = true;
          req.session._id = saved._id;
          req.session.username = saved.username;
          res.status(201).json(saved)
        })
        .catch(error => res.status(500).json({error: "something went horribly wrong"}));
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
                  req.session.auth = true;
                  req.session._id = user._id;
                  req.session.username = user.username;
                  res.status(200).json({ success: true, user: user });
                } else res.status(422).json({ success: false, message: "Invalid Password"});
              })
          } else res.status(404).json('user not found');
        })
        .catch(error => res.status(500).json(error));
    }
  })

  router
  .route('/logout')
  .post((req, res) => {
    req.session.regenerate(err => res.json(err));
    res.status(200).json('logged out');
  })

  module.exports = router;