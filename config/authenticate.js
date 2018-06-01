const jwt = require('jsonwebtoken');
const secret = 'thesunisinyoureyes'

const authenticate = (req, res, next) => {
  const token = req.get('Authorization');
  if (token) {
    jwt.verify(token, secret, (err, decoded) => {
      if (err) return res.status(422).json(err);
      req.decoded = decoded;
      next();
    });
  } else {
    res
      .status(403)
      .json("No token provided. Must be set in Authorization header.");
  }
};

module.exports = { authenticate };