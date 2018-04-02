const jwt = require('jsonwebtoken');
require('dotenv').config();
const secret = process.env.SECRET;
const badRequest = process.env.STATUS_BAD_REQUEST;
const forbidden = process.env.STATUS_FORBIDDEN;

const getTokenForUser = userObject => {
  return jwt.sign(userObject, secret, { expiresIn: '1h' });
};

const validateToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    res
      .status(badRequest)
      .json({ error: 'No authorization token found on Authorization header' });
  }
  jwt.verify(token, secret, (authError, decoded) => {
    if (authError) {
      res
        .status(forbidden)
        .json({ error: 'Token invalid. Please, log in.' })
      return;
    }
    req.decoded = decoded;
    next();
  });
};

module.exports = {
  getTokenForUser,
  validateToken
};