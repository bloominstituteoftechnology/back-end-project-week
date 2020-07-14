require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports = {
  generateToken,
  authenticate
};

function generateToken(user) {
  const payload = {
    user
  };
  const secret = process.env.JWT_SECRET;
  const options = {
    expiresIn: "1h"
  };
  return jwt.sign(payload, secret, options);
};

function authenticate(req, res, next) {
  const { token } = req.session;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) return res.status(401).json({ message: `Error: ${err}` });
      req.decoded = decoded;
      next();
    });
  } else {
    return res
      .status(401)
      .json({
        error: "No token provided, must be set on the Authorization Header."
      });
  }
};
