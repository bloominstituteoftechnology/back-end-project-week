const express = require('express');
const router = express.Router();

const User = require('../models/UserSchema');

router.post('/register', (req, res) => {
  const newUser = req.body;
  if (!newUser.username || !newUser.password) {
    res
      .status(400)
      .json({ msg: 'Please provide a username and a password.', error: err });
  }
  const user = new User(newUser);
  user
    .save()
    .then(savedUser => {
      res.status(200).json(savedUser);
    })
    .catch(err => {
      res
        .status(500)
        .json({ msg: 'There was an error saving the user.', error: err });
    });
});

router.post('/login', (req, res) => {
  const session = req.session;
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(400).json({
      msg: 'Please enter both a username and a password.',
    });
  }
  User.findOne({ username })
    .populate('notes')
    .then(foundUser => {
      if (!foundUser) res.status(404).json({ msg: 'User does not exist' });
      foundUser
        .checkPassword(password, res)
        .then(isValid => {
          if (isValid) {
            session.username = username;
            res
              .status(200)
              .json({ username: foundUser.username, notes: foundUser.notes });
          } else {
            res.status(400).json({ msg: 'Incorrect password' });
          }
        })
        .catch(err => res.error(err));
    });
});

router.post('/logout', (req, res) => {
  delete req.session.username;
  res.status(200).json({ msg: 'Logged out.' });
});

module.exports = router;