const jwt = require('jsonwebtoken');
const secret = 'antidisestablishmentarionism'


function protected(req, res, next) {
  const token = req.headers.authorization;

  if (token) {
    jwt.verify(token, secret, (err, decodedToken) => {
      if (err) {
        return res
          .status(401)
          .json({ error: ' token invalid' })
      }

      req.jwtToken = decodedToken;
      next();
    })
  } else {
    return res.status(401).json({ error: 'no token found' })
  }
}

function generateToken(user) {
  const payload = {
    username: user.username,
  }

  const options = {
    expiresIn: '1h',
    jwtid: '8728391',
  }

  return jwt.sign(payload, secret, options)
}

module.exports = { generateToken, protected }
