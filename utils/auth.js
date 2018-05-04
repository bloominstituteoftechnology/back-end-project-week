const jwt = require('jsonwebtoken');
const User = require('../user/userModel');
const secret = "Depsite that, we never stop trying. Why? It's a dream that never ends.";

const authenticate = (req, res, next) => {
  const token = req.get('Authorization');
  if (token) {
    jwt.verify(token, mysecret, (err, decoded) => {
      if (err) return res.status(422).json(err);
      req.decoded = decoded;
      next();
    });
  } else {
    return res.status(403).json({
      Error: 'No token provided, must be set on the Authorization Header',
    });
  }
};

module.exports = authenticate;
