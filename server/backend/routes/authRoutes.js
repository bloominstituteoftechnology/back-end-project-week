const router = require("express").Router();
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const config = require("../../config");
const secret = config.secret;

//base prefix is '/api/auth'

router.post("/register", function(req, res) {
  User.create(req.body)
    .then(({ username, race }) => {
      res.status(201).json({ username, race });
    })
    .catch(err => res.status(500).json(err));
});

function generateToken(user) {
  const options = {
    expiresIn: "30m"
  };
  const payload = { name: user.username };

  return jwt.sign(payload, secret, options);
}

router.post("/login", (req, res) => {
  const { username, password } = req.body;

  User.findOne({ username })
    .then(user => {
      if (user) {
        user
          .validatePassword(password)
          .then(passwordsMatch => {
            if (passwordsMatch) {
              const token = generateToken(user);

              res.status(200).json({ message: `Welcome ${username}!`, token });
            } else {
              res.status(401).send("invalid credentials");
            }
          })
          .catch(err => {
            res.send("error comparing passwords");
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
