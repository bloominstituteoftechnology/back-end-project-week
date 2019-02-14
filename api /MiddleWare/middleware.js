const jwt = require('jsonwebtoken');
const { secret } = require('../keys');
const uuid = require('uuid/v1');

module.exports = {
  protected: (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) res.status(400).json({ Message: `No token` });
    jwt.verify(token, secret, (err, decodedToken) => {
      if (err) res.json({ Message: `Invalid Token` }) //Invalid token
      console.log("decodedToken", decodedToken);
      req.username = decodedToken.username;
      next();
    })
  },
  newToken: (user) => {
    const payload = {
      username: user.username
    };
    const options = {
      expiresIn: "1h",
      jwtid: uuid(),
      role: user.role,
      id: user.id
    };
    return jwt.sign(payload, secret, options);
  }
}