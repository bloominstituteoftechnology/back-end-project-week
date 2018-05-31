const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
  const token = req.get('Authorization');
  if (token) {
    jwt.verify(token, "1995TY11AR10", (err, decoded) => {
      if (err) return res.status(422).json(err);
      req.decoded = decoded;
      next();
    });
  }
  res.status(403).json('No token provided. Must be set in Authorization header.');
};

module.exports = { authenticate };