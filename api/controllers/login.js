const jwt = require('jsonwebtoken');
const { mysercet } = require('../../config');

const User = require('../models/userModel');

const login = (req, res) => {
  const { username, password } = req.body;

  User.findOne({ username }, (error, user) => {
    if (error) {
      res.status(403).json({ error: 'invalid user name' });
      return;
    }

    if (user === null) {
      res.status(422).json({ error: 'No user with that username in DB' });
      return;
    }

    user.checkPassword(password, (nonMatch, hashMatch) => {
      if (nonMatch !== null) {
        res.status(422).json({ error: 'passwords dont match' });
        return;
      }
      if (hashMatch) {
        const payload = {
          username: user.username
        };
        const token = jwt.sign(payload, mysercet);
        res.json({ token });
      }
    });
  });
};

module.exports = {
  login
};
