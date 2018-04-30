const jwt = require('jsonwebtoken');

const User = require('../models/userModel');

const authenticate = (req, res, next) => {
  const token = req.get('Authorization');
  if (token) {
    jwt.verify(token, (error, decoded) => {
      if (error) {
        return res.status(422).json(error);
        req.decoded = decoded;
        next();
      } else {
        return res.status(403).json({
          error: 'No token provided, must be set on the Authorization Header'
        });
      }
    });
  }
};

module.exports = {
  authenticate
};
