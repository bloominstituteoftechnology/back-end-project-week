const User = require('./UserSchema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { secret } = require('../../config');

const createUser = (req, res) => {
  const { username, password } = req.body;
  const user = new User({ username, password: password });
  user.save((err, user) => {
    if (err) return res.send(err);
    res.json({ msg: 'User created', user });
  });
};

const authenticate = (req, res, next) => {
  const token = req.get('Authorization');
  if (token) {
    jwt.verify(token, secret, (err, decoded) => {
      if (err) return res.status(422).json(err);
      req.decoded = decoded;
      next();
    });
  } else {
    return res.status(403).json({ msg: 'No token provided', error: err });
  }
};

const login = (req, res) => {
  const { username, password } = req.body;
  User.findOne({ username }, (err, user) => {
    if (err) {
      res.status(403).json({ msg: 'Username/Password incorrect', error: err });
      return;
    }
    if (user === null) {
      res.status(422).json({ msg: 'User does not exist' });
      return;
    }
    user.checkPass(password, (nonMatch, hashMatch) => {
      if (nonMatch !== null) {
        res.status(422).json({ msg: 'Passwords do not match', error: err });
        return;
      }
      if (hashMatch) {
        const payload = {
          username: user.username,
        };
        const token = jwt.sign(payload, secret);
        res.json({ token });
      }
    });
  });
};

module.exports = {
  createUser,
  authenticate,
  login,
};
