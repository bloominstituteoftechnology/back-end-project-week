const jwt = require('jsonwebtoken');

const User = require('../models/user');
const Note = require('../models/note');
const secret = require('../../config');
const BadToken = require('../models/badToken');

//Errors I've Checked:
//Password shorter than 8 characters results in 'Error Creating User'
//Duplicate username results in 'Error Creating User'
//Empty String in username results in 'Error Creating User'
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

// Errors I've Checked:
// Bad username results in 'Username Does Not Exist'
// Bad password results in 'Password is Incorrect'
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
          userId: user._id,
        };
        const token = jwt.sign(payload, secret, { expiresIn: '1h' });
        res.status(200).json({ message: 'User Logged In', user, token });
      }
    });
  });
};

//Errors I've Checked:
//Invalid ID as paramater results in 'User Not Logged In'
//Invalid Token in Header results in 'Failed to Verify Token'
const logoutUser = (req, res) => {
  if (req.decoded.userId === req.params.userId) {
    const badToken = req.headers.authorization;
    const newBadToken = new BadToken({ badToken });
    newBadToken.save().then((token) => {
      User.findById(req.params.userId)
        .then((user) => {
          res.status(200).json({ message: 'User Logged Out', user });
        })
        .catch((error) => {
          res.status(422).json({ message: 'User Log Out Failed', error });
        });
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
