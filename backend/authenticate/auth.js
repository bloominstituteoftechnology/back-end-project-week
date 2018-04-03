const { secret } = require("../secret");
const jwt = require("jsonwebtoken");

const makeToker = userMod => {
  return jwt.sign(userMod, secret, { expiresIn: "1d" });
};

const authenticateToker = (req, res, next) => {
  const toker = req.headers.authorization;
  if (!toker) {
    res.status(422).json({ error: "Toker was not found" });
  }
  jwt.verify(toker, secret, (authError, decoded) => {
    if (authError) {
      res.status(403).json({ error: "Invalid toker" });
      return;
    }
    req.decoded = decoded;
    next();
  });
};

module.exports = { makeToker, authenticateToker };
