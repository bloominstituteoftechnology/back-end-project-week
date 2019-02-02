const jwt = require('jsonwebtoken');

const jwtKey = require('../_secrets/keys').jwtKey;

// quickly see what this file exports
module.exports = {
  authenticate,
  generateToken
};

// implementation details
function authenticate(req, res, next) {
  // 
  const token = req.get('Authorization');
  // req.body.headers.authorization

 console.log('Authenticate  token = ', token);
// console.log('Authenticate  req.body.headers.authorization = ', req.body.headers.authorization);
// console.log('Authenticate  req.body = ', req.body);

  if (token) {
    jwt.verify(token, jwtKey, (err, decoded) => {
      if (err) return res.status(401).json(err);

      req.decoded = decoded;

      next();
    });
  } else {
    return res.status(401).json({
      error: 'No token provided, must be set on the Authorization Header',
    });
  }
}

function generateToken(user) {
  const payload = {
    subject: user.id,
    username: user.username,
  }
  const options = {
    expiresIn: '10000h',
  };

  return jwt.sign(payload, jwtKey, options);
}