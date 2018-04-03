const jwt = require('jsonwebtoken');
const { mysecret } = require('../../config');
const User = require('../models/UserModel');

const login = (req, res) => {
  let { username, password } = req.body;
  username = username.toLowerCase();
  User.findOne({ username }, (err, user) => {
    if (err) {
      res.status(403).json({ error: 'Invalid Username/Password' });
      return;
    }
    if (user === null) {
      res.status(422).json({ error: 'No user with that username in our DB' });
      return;
    }
    user.checkPassword(password, (nonMatch, hashMatch) => {
      if (nonMatch !== null) {
        res.status(422).json({ error: 'No match' });
        return;
      }
      if (hashMatch) {
        const payload = {
          username: user.username
        };
        const token = jwt.sign(payload, mysecret);
        res.json({ token });
      }
    });
  });
};

module.exports = {
  login
};