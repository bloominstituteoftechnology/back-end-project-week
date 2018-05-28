const jwt = require('jsonwebtoken');
const { mySecret } = require('./config');

const authenticate = (req, res, next) => {
  const token = req.get('Authorization');
  if (token) {
    jwt.verify(token, mySecret, (err, jwtObj) => {
      if (err) return res.status(422).json(err);
      req.jwtObj = jwtObj;
      next();
    });
  } else {
    return res.status(403).json({ error: 'No token provided' });
  }
};

module.exports = {
  authenticate
};
