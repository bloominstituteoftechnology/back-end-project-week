const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const { mysecret } = require('../../config');

const authenticate = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token, mysecret, (err, decoded) => {
      if (err) {
        return res.status(422).json(err);
      }
      req.decoded = decoded;
      next();
    });
  } else {
    return res.status(403).json({
      message: 'No token provided, must be set on the Authorization Header',
    });
  }
};

module.exports = {
  authenticate,
};
