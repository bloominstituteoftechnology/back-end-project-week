const jwt = require('jsonwebtoken');

function generateToken(user) {
  const timestamp = new Date().getTime();
  const payload = {
    email: user.email,
    _id: user._id,
    iat: timestamp,
  };

  const secret = 'Nothing';
  return (token = jwt.sign(payload, secret, {
    expiresIn: 60 * 60 * 24,
  }));
}

module.exports = { generateToken };
