const jwt = require('jsonwebtoken');
const secret = 'secret';

function generateToken (user) {
  const payload = {
    username: user.username
  };
  const options = {
    expiresIn: '1h',
    jwtid: '12345',
  };
  return jwt.sign(payload, secret, options);
};

function authenticate (req, res, next) {
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token, secret, (err, decodedToken) => {
      if (err) {
        res.status(401).json({ message: 'Invalid Token' });
      } else {
        req.user = { username: decodedToken.username };
        next();
      }
    });
  } else {
    res.status(401).json({ message: 'no token provided' });
  }
};

module.exports = {
    authenticate,
    generateToken
  };
  