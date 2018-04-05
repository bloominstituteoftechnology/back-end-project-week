const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const User = require('../models/user-model.js');
const config = require('../config');

const newToken = (user) => {
  return jwt.sign(user, config.jwtSecret, {
    expiresIn: 10800, // in seconds
  });
};

module.exports = newToken;
