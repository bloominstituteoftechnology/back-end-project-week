const jwt = require('jsonwebtoken');

const User = require('../models/userModels');
const { mysecret } = require('../../config');

const authenticate = (req, res, next) => {
  // You won't need to change anything in this file here.
  const token = req.get('Authorization');
  if (token) {
    jwt.verify(token, mysecret, (err, decoded) => {
      if (err) return res.status(422).json(err);
      req.decoded = decoded;
      next();
    });
  } else {
    return res.status(403).json({
      error: 'No token provided, must be set on the Authorization Header'
    });
  }
};

module.exports = {
  authenticate
};
