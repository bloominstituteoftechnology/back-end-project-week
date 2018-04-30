const express = require('express');
const router = express.Router();
const User = require('../models/userModel');

router.post('/', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(422).json({ message: 'Username and password is required' });
  } else {
    User.findOne({ username }, (err, user) => {
      user.verifyPassword(password, (err, isValid) => {
        if (isValid) {
          res.json({ message: 'successful login' });
        } else {
          res
            .status(422)
            .json({ message: 'please provide a valid username or password' });
        }
      });
    });
  }
});

module.exports = router;
