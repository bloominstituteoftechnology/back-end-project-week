const jwt = require("jsonwebtoken");

const secret = process.env.SECRET || "secret";

function generateToken(user) {
  const payload = {
    username: user.username
  };

  const options = {
    expiresIn: "1h",
    jwtid: "1234"
  };

  return jwt.sign(payload, secret, options);
}

function protected(req, res, next) {
  const token = req.headers.authorization;
  if (token !== "null") {
    jwt.verify(token, secret, (err, decodedToken) => {
      if (err) {
        console.log(err);
        res.status(401).json({ message: "Invalid token." });
      } else {
        req.user = { username: decodedToken.username };
        next();
      }
    });
  } else {
    res.status(401).json({ message: "Please log in." });
  }
}

module.exports = {
  generateToken,
  protected
};
