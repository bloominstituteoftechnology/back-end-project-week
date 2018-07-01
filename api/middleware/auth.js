require('dotenv').config();

const jwt = require('jsonwebtoken');

const generateToken = payload => {
  const options = {
    expiresIn: '1h'
  };
  return jwt.sign(payload, process.env.JWT_SECRET, options);
};

const authenticate = (req, res, next) => {
  const token = req.headers.authorization
    ? req.headers.authorization.replace(/^Bearer /, '')
    : '';

  jwt.verify(token, process.env.JWT_SECRET, (error, decodedToken) => {
    if (error) {
      return res.status(401).json({ error: 'Access denied. Invalid token.' });
    } else {
      req.tokenPayload = decodedToken;
      next();
    }
  });
};

module.exports = {
  generateToken: generateToken,
  authenticate: authenticate
};
