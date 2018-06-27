const jwt = require('jsonwebtoken');

const secret = require('../auth/secret');

function generateToken(user) {
  const options = {
    expiresIn: '1h',
  };
  const payload = { name: user.username};

  // sign the token
  return jwt.sign(payload, secret, options);
}

module.exports = generateToken;