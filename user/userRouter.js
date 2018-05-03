const express = require('express');
const User = require('./userModel');
const router = express.Router();

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
          user.checkPassword(password); // resume here, need JWT
        }
      })
      .catch();
  }
});

module.exports = router;
