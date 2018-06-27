const middleware = require("./middleware.js");
const express = require("express");
const router = express.Router();
const User = require("./users/User.js");
const jwt = require("jsonwebtoken");

const generateToken = username => {
  const options = {
    expiresIn: "1h"
  };
  const payload = { username };
  return jwt.sign(payload, process.env.SECRET, options);
};

router.route("/").post(middleware.sanitizeMiddleware("user"), (req, res) => {
  const { username, password } = req.saneBody;

  User.findOne({ username })
    .then(user => {
      if (user) {
        user.validatePassword(password).then(passwordsMatch => {
          if (passwordsMatch) {
            const token = generateToken(username);
            res.status(200).json({ username, token });
          } else {
            res.status(401).send("invalid credentials");
          }
        });
      } else {
        res.status(401).send("invalid credentials");
      }
    })
    .catch(err => {
      res.send(err);
    });
});

module.exports = router;
