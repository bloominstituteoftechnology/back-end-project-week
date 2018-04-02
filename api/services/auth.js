const jwt = require('jsonwebtoken');
const { secret } = require('../config');

const getTokenForUser = userObject => {
  return jwt.sign(userObject, secret, { expiresIn: '1h' });
};

const validateToken = (req, res, next) => {
  const token = req.get('Authorization');
    if (token) {
      jwt.verify(token, secret, (err, decoded) => {
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
  getTokenForUser,
  validateToken
};
