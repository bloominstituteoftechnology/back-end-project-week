const User = require('../models/userModel');
const { sendUserError } = require('../utils/middleware');
const jwt = require('jsonwebtoken');
const { mysecret } = require('../../config');

const createUser = (req, res) => {
  const { email, password } = req.body;

  const newUser = new User({ email, password });
  newUser.save((err, savedUser) => {
    if (err) {
      return sendUserError(err, res);
    }
    res.json({ success: 'New user created', savedUser });
  });
};

const login = (req, res) => {
  let { email, password } = req.body;
  email = email.toLowerCase();
  User.findOne({ email }, (err, user) => {
    if (err) {
      return sendUserError('Could not log in', res);
    }
    if (user === null) {
      return sendUserError('Cannot find user', res);
    }
    user.checkPassword(password, (noMatch, match) => {
      if (noMatch !== null) {
        return sendUserError('Passwords do not match', res);
      }
      if (match) {
        const payload = {
          email: user.email,
        };
        const token = jwt.sign(payload, mysecret);
        res.json({ message: 'successfully logged in', token });
      }
    });
  });
};

module.exports = {
  createUser,
  login,
};
