const jwt = require('jsonwebtoken');
const { secret } = require('../secrets/config');

function makeToken(user) {
  // sub: subject (id)
  // iat:
  //return token...

  const timestamp = new Date().getTime();

  const payload = {
    sub: user._id,
    iat: timestamp,
    username: user.username,
  };
  const options = {
    expiresIn: '1h',
  };

  return jwt.sign(payload, secret, options);
}

module.exports = { makeToken };
