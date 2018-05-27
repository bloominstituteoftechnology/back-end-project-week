const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const secret = 'this is a secret message, in uncharted space';

const middlewareAuthenticate = (req, res, next) => {
  const token = req.get('Authorization');
  if(token) {
    jwt.verify(token, secret, (err, decoded) => {
      if(err) return res.status(422).json({ message: 'There was an error.', err });
      req.decoded = decoded;
      next();
    });
  } else {
    return res.status(403).json( {
      message: 'No token provided, must be set on the Authorization Header'
    });
  }
};

module.exports = middlewareAuthenticate;
