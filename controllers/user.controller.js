const User = require('../models/user');
const requireAuth = require('../config/passport').requireAuth;
const getTokenForUser = require('../config/token');

function setUserInfo(request) {
  const getUserInfo = {
    _id: request._id,
    username: request.username,
    email: request.email,
  };

  return getUserInfo;
}

function validateEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};

const createUser = (req, res, next) => {
  const { username, email, password } = req.body;

  console.log(validateEmail(email));

  if (!email) {
    return res.status(422).json({ error: 'You must enter an email address.' });
  }

  if (!validateEmail(email)) {
    return res.status(422).json({ error: 'You must enter a valid email address.' });
  }

  if (!username) {
    return res.status(422).json({ error: 'You must enter a username.' });
  }

  if (!password) {
    return res.status(422).json({ error: 'You must enter a password.' });
  }

  const user = new User({ username, email, password });

  user.save((error, newUser) => {
    if (error) return res.send(error);
    const userInfo = setUserInfo(newUser);
    res.status(201).json({
      token: getTokenForUser(userInfo),
      user: userInfo,
    });
  });
};

const getUsers = (req, res) => {
  User.find({}, (err, users) => {
    if (err) return res.send(err);
    res.send(users);
  });
};

module.exports = { createUser, getUsers };