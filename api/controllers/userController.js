const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const { mysecret } = require('../../config');

const sendUserError = (err, res) => {
  res.status(422);
  if (err && err.message) {
    res.json({ message: err.message, stack: err.stack });
  } else {
    res.json({ error: err });
  }
};

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
          id: user.id,
        };
        const token = jwt.sign(payload, mysecret);
        res.json({ message: 'successfully logged in', token, id: user.id });
      }
    });
  });
};

// const getUsers = (req, res) => {
//   User.find({}, (users, err) => {
//     if (err) return res.status(500).json('Could not get users');
//     res.json(users);
//   });
// };

module.exports = {
  createUser,
  login,
  //getUsers,
};
