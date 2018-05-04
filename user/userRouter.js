const express = require('express');
const User = require('./userModel');
const router = express.Router();
const { secret } = require('../utils/auth');

// user sign-up
router.route('/').post((req, res) => {
  const { username, password } = req.body;
  const user = new User({ username, password });

  if (username && password) {
    user
      .save()
      .then(newUser => res.status(201).json(newUser))
      .catch(err => res.status(500).json(err));
  } else res.status(422).json({ Error: 'Enter username and password' });
});

// user sign-in
router.route('/login').post((req, res) => {
  const { username, password } = req.body;

  if (username && password) {
    User.findOne({ username })
      .then(user => {
        if (user) {
          user.checkPassword(password, (nonMatch, hashMatch) => {
            if (nonMatch !== null) {
              res.status(422).json({ Error: 'Enter the correct password' });
            }
            if (hashMatch) {
              const payload = { username: user.username, id: user._id };
              const token = jwt.sign(payload, secret, { expiresIn: '1h' });
              return res.json({ token, user });
            } else {
              return res.status(422).json({ Error: 'Incorrect password' });
            }
          });
        }
      })
      .catch(err => res.status(500).json(err));
  } else res.status(422).json({ Error: 'Enter valid username and password' });
});

module.exports = router;
