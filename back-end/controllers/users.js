const jwt = require('jsonwebtoken');

const User = require('../models/user');
const Note = require('../models/note');
const secret = require('../../config');

const createUser = (req, res) => {
  const newUser = new User(req.body);
  newUser
    .save()
    .then((user) => {
      res.status(201).json({ message: 'User Created Successfully', user });
    })
    .catch((error) => {
      res.status(422).json({ message: 'Error Creating User', error });
    });
};

const loginUser = (req, res) => {
  let { username, password } = req.body;
  username = username.toLowerCase();
  User.findOne({ username }, (error, user) => {
    if (error) {
      res.status(403).json({ message: 'Invalid Username/Password', error });
      return;
    }
    if (user === null) {
      res.status(422).json({ message: 'Username Does Not Exist' });
      return;
    }
    user.checkPassword(password, (noMatch, match) => {
      if (noMatch !== null) {
        return res.status(422).json({ error: 'Password is Incorrect' });
      }
      if (match) {
        const payload = {
          username: user.username,
        };
        const token = jwt.sign(payload, secret);
        res.status(200).json({ message: 'User Logged In', user, token });
      }
    });
  });
};

const logoutUser = (req, res) => {
  if (req.decoded.username === req.body.username) {
    const username = req.body;
    User.findOne(username)
      .then((user) => {
        res.status(200).json({ message: 'User Logged Out', user });
      })
      .catch((error) => {
        res.status(422).json({ message: 'User Log Out Failed', error });
      });
  } else {
    res.status(422).json({ message: 'User Not Logged In' });
  }
};

module.exports = {
  createUser,
  loginUser,
  logoutUser,
};
