const router = require("express").Router();
const jwt = require("jsonwebtoken");
const User = require("../schema/userSchema");

const generateToken = user => {
  const options = {
    expiresIn: "1h"
  };
  const payload = { name: user.username };
  const secret = "Derrick is really Kevin";
  return jwt.sign(payload, secret, options);
};

const postLogin = (req, res) => {
  const { username, password } = req.body;
  User.findOne({ username })
    .then(user => {
      if (!user) {
        res.status(404).json(`username not found`);
      } else {
        user
          .validatePassword(password)
          .then(passwordsMatched => {
            if (passwordsMatched) {
              const token = generateToken(user);
              res
                .status(200)
                .json({ message: `Welcome, ${user.username}`, token });
            } else {
              res.status(400).json({ Error: "passwords do not match" });
            }
          })
          .catch(err => {
            res.status(500).json(err.message);
          });
      }
    })
    .catch(err => {
      res.status(500).json(err.message);
    });
};

const postRegister = (req, res) => {
  const { username, password } = req.body;
  User.create({ username, password })
    .then(user => {
      const token = generateToken(user);
      res.status(201).json({ username: user.username, token });
    })
    .catch(err => {
      res.status(500).json(err.message);
    });
};

router.route("/login").post(postLogin);

router.route("/register").post(postRegister);

module.exports = router;
