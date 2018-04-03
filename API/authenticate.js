const jwt = require('jsonwebtoken');
const { mySecret } = require('./config');

const authenticate = (req, res, next) => {
  const { token } = req.headers;
  if (token) {
    jwt.verify(token, mySecret, (err, decoded) => {
      if (err) return res.status(422).json(err);
      req.decoded = decoded;
      next();
    });
  } else {
    return res.status(403).json({
      error: 'No token provided'
    });
  }
};

module.exports = {
  authenticate
};
