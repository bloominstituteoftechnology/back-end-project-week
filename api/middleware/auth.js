const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const mySecret = process.env.SECRET || 'No, thank you! We don\'t want any more visitors, well-wishers or distant relations!';

const User = require('../models/userModel');

const authenticate = (req, res, next) => {
  const token = req.get('Authorization');
  if(token) {
    jwt.verify(token, mySecret, (err, decoded) => {
      if (err) return res.status(422).send(err);
      req.decoded = decoded;
      req.username = decoded.username;
      next();
    });
  } else {
    return res.status(403).send({ error: 'No token provided, must be set on Authorization Header' });
  }
};

const encryptPW = (req, res, next) => {
  let { username, password } = req.body;
  bcrypt.hash(password, 11, (err, hash) => {
    if (err) return next(err);
    this.password = hash;
    req.user = { username, password: this.password };
    next();
  })
};

const comparePW = (req, res, next) => {
  const { username, password } = req.body;
  User.findOne({ username })
    .then(user => {
      const checkPW = user.password;
      bcrypt.compare(password, checkPW, (err, compared) => {
        if(err) return next(err);
        req.username = user.username;
        next();
      })
    }).catch(err => {
      res.status(500).send(err);
    })
}

module.exports = {
  comparePW,
  encryptPW,
  authenticate
}