const jwt = require('jsonwebtoken'),
      User = require('../models/user'),
      config = require('../config');

// generate a JSON web token for User obj
function generateToken(user) {
  return jwt.sign(user, config.secret, {
    expiresIn: 10080
  });
}

// user info being selected from request
function setUserInfo(request) {
  return {
    _id: request._id,
    email: request.email
  }
};

// Login Route
const login = (req, res) => {
  let userInfo = setUserInfo(req.user);

  res.status(200).json({
    token: `JWT ${generateToken(userInfo)}`,
    user: userInfo
  });
};

const register = (req, res) => {
  const { email, username, password } = req.body;

  if (!email) {
    return res.status(422).json({ error: 'You must enter an email address.' });
  }

  if (!username) {
    return res.status(422).json({ error: 'You must enter a username.' });
  }

  if (!password) {
    return res.status(422).json({ error: 'You must enter a password.' });
  }

  User.findOne({ email }, (err, isUser) => {
    if (err) return next(err);

    if (isUser) {
      res.status(422).json({ error: 'That email is already in use.' });
    }

    let user = new User({
      email,
      password,
    });

    user.save((err, user) => {
      if (err) return next(err);

      let userInfo = setUserInfo(user);
      res.status(201).json({
        token: `JWT ${generateToken(userInfo)}`,
        user: userInfo,
      });
    });
  });
};

module.exports = { login, register };