const jwt = require("jsonwebtoken");

const User = require("../users/userModel");
const config = require("../config");

const authenticate = (req, res, next) => {
  let token = req.get("Authorization");
  if (token != undefined) token = token.replace("Bearer ", "");
  if (token) {
    jwt.verify(token, config.secret, (err, decoded) => {
      if (err) return res.status(422).json(err);
      req.decoded = decoded;
      next();
    });
  } else {
    console.log("Repelled Invader", token);
    return res.status(403).json({
      error: "You're not allowed in here!"
    });
  }
};

module.exports = {
  authenticate
};
