const User = require('../models/UserModel');
const jwt = require('jsonwebtoken');
const session = require('express-session');
const { secret } = require('../config');
const { getTokenForUser } = require('../services/auth');

const login = (req, res) => {
  const { username, password } = req.body;
  const lowercaseUsername = username.toLowerCase();
  User.findOne({ username: lowercaseUsername }, (err, user) => {
    if (!username || !password) {
      res.status(422).json({ message: 'Must enter a username and password!' });
      return;
    }
    if (err) {
      res.status(500).json({ error: 'Invalid Username/Password' });
      return;
    }
    if (user === null) {
      res.status(422).json({ error: 'No user with that username in our DB' });
      return;
    }
    user.checkPassword(password, (err, validated) => {
      if (err) {
        res.status(422).json({ error: 'Passwords do not match!' });
        return;
      }
      if (validated === false) {
        res.status(422).json({ error: 'Passwords do not match!' });
        return;
      }
      if (validated) {
        const token = getTokenForUser({ username: user.username });
        res.json({ token });
      }
    });
  });
};

module.exports = {
  login
};