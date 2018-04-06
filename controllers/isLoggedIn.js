const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const User = require('../models/user-model.js');
const config = require('../config');

const isLoggedIn = (req, res, next) => {
  const token = req.headers.authorization;
  jwt.verify(token, config.jwtSecret, (err, decoded) => {
    if (err) {
      console.log(err);
      res.status(403).json({ error: 'Please login in.', message: err });
      return;
      
    } else if (decoded._id === req.headers.userid) {
    req.decoded = decoded;
    next();
    } else res.status(403).json({ error: 'User ids don\'t match. Please login again.', message: err });
  });
};

module.exports = isLoggedIn;
