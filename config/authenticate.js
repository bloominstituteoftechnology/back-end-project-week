const jwt = require('jsonwebtoken');
const User = require('../modules/users');
const secret = 'thesunisinyoureyes'

const authenticate = (req, res, next) => {
  const token = req.get('token');
  if (token) {
    jwt.verify(token, secret, (err, decoded) => {
      if (err) return res.status(422).json(err);
      req.user = decoded;
      next();
    });
  } else {
    res
      .status(403)
      .json("No token provided. Must be set in Authorization header.");
  }
};

module.exports = { authenticate };