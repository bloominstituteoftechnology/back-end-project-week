const jwt = require('jsonwebtoken');

const User = require('../models/userModel');
const { secret } = require('../../config');

const tokenGenerator = userObject => {
  return jwt.sign(userObject, secret, { expiresIn: '1h'});
};

const authenticate = async function(req, res, next) {
  const token = req.get('Authorization');
  try {
    if (token) {
        req.decoded = await jwt.verify(token, secret);
        next();
    } else {
      res.status(403).json({
        error: 'No token provided, must be set on the Authorization Header'
      });
    }
  } catch (err) {
    res.status(400).json({ error: err });
  };
};

module.exports = { 
  tokenGenerator,
  authenticate,
};
