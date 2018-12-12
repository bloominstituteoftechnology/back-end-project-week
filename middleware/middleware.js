require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports = {
  generateToken,
  protected
};

function generateToken(user) {
  const payload = {
    subject: user.id,
    username: user.username,
    roles: ["admin", "grunts", "big boss"]
  };

  const secret = process.env.JWT_SECRET;
  const options = {
    expiresIn: "10m"
  };
  return jwt.sign(payload, secret, options);
}

function protected(req, res, next) {
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decodeToken) => {
      if (err) {
        res.status(401).json({ message: "invalid token", err });
      } else {
        req.decodeToken = decodeToken;
        next();
      }
    });
  } else {
    res.status(401).json({ message: "no token provided" });
  }
}
