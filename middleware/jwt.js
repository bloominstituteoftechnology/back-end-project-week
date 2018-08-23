const jwt = require('jsonwebtoken');
const uuid = require('uuid/v4');

// get my env secrets
require('dotenv').config();
const SECRET = process.env.SECRET;

function jwtRoute(req, res, next) {
  const token = req.headers.authorization;

  if (token) {
    jwt.verify(token, SECRET, (err, decodedToken) => {
      if (err) {
        return res.status(401).json({ error: 'invalid token' });
      }

      req.jwtToken = decodedToken;
      next();
    });
  } else {
    return res.status(401).json({ error: 'no token' });
  }
}

function generateToken(user) {
  const payload = {
    username: user.username,
    userId: user.id,
  };

  const options = {
    expiresIn: '1h',
    jwtid: uuid(),
  };

  return jwt.sign(payload, SECRET, options);
}

module.exports.jwtRoute = jwtRoute;
module.exports.generateToken = generateToken;
