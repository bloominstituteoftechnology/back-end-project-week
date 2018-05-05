const express = require('express');
const router = express.Router();
const User = require('./userModel');
const { authenticate, restricted, tokenize } = require('../authentication');

// POST new user
router.post('/register', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(422).json({ message: 'Must enter username AND password' });
  } else {
    const newUser = new User({ username, password });
    newUser
      .save()
      .then(response => {
        const userToken = tokenize(newUser);

        res.json({ token, user: response.data });
      })
      .catch(err => res.status(500).json(err));
  }
});

// LOGIN

router.post('/login', authenticate, (req, res) => {
  const { _id, username, notes } = req.user;
  const userToken = tokenize({ _id, username });

  User
    .findById(_id)
    .select('-password')
    .populate('notes')
    .then(user => res.json({ userToken, user }));
});

router.get('/login', restricted, (req, res) => {
  const { _id } = req.user;

  User
    .findById(_id)
    .select('-password')
    .populate('notes')
    .then(user => res.json({ user }))
    .catch(err => res.status(500).json(err));
});

// LOGOUT
router.get('/logout', (req, res) => {
  res.json({ message: 'Logged out >:]' });
});

module.exports = router;