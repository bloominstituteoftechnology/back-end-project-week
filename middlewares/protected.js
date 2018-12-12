require('dotenv').config();
const jwt = require('jsonwebtoken');

function protected(req, res, next) {
  const token = req.headers.authentication;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
      if (err) {
        res.status(401).json({ message: 'Token is invalid', err });
      } else {
        req.decodedToken = decodedToken;
        next();
      }
    });
  } else {
    res.status(401).json({ message: 'No token provided.' });
  }
}

module.exports = protected;
