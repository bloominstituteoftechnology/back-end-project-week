const jwt = require('jsonwebtoken');
const secret = require('../config').secret;

const getToken = userObject => {
  return jwt.sign(userObject, secret, { expiresIn: '10s' });
};

const validateToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    res
      .status(422)
      .json({ error: 'No authorization token found on Authorization header' });
  }
  jwt.verify(token, secret, (authError, decoded) => {
    if (authError) {
      res
        .status(403)
        .json({ error: 'Token invalid, please login', message: authError });
      return;
    }
    req.decoded = decoded;
    next();
  });
};

module.exports = {
  getToken,
  validateToken,
};
