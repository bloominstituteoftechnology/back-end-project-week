// const jwt = require("jsonwebtoken");
// const passport = require("passport");
// const LocalStrategy = require("passport-local");
// const { ExtractJwt } = require("passport-jwt");
// const JwtStrategy = require("passport-jwt").Strategy;

const User = require('../../users/userModel');
const config = require('../config');

const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
  const token = req.get('Authorization');
  if (token) {
    jwt.verify(token, config.secretKey, (err, decoded) => {
      if (err) return res.status(422).json(err);
      req.decoded = decoded;
      next();
    });
  } else {
    return res.status(403).json({
      error: 'No token provided, must be set on the Authorization Header',
    });
  }
};

// Add in the make token function
const makeToken = user => {
  // sub: subject (id) who the token is about
  // iat: issued at time
  const timestamp = new Date().getTime();
  const payload = {
    sub: user._id,
    iat: timestamp,
    username: user.username,
  };
  const options = { expiresIn: '4h' };

  return jwt.sign(payload, config.secretKey, options);
};

module.exports = {
  authenticate,
  makeToken,
};
