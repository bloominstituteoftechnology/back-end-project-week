const jwt = require('jsonwebtoken');
const secret = process.env.SECRET
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
      username: user.username,
      userId: user.id
    };
    const options = {
      expiresIn: "1h",
      jwtid: uuid(),
    };
    return jwt.sign(payload, secret, options);
  },

}