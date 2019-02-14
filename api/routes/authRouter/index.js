const express = require("express");
const DB = require("../../../data/helpers/auth");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// function helpers
function generateToken(user) {
  user = Object.assign({}, user, { password: "******" });
  const payload = { ...user };
  const secret = process.env.SECRET;
  const options = {
    expiresIn: "48hr"
  };

  return jwt.sign(payload, secret, options);
}
// MIDDLEWARE

// END MIDDLEWARE

router.post("/register", (req, res) => {
  const { user } = req.body;

  if (user.name && user.password && user.email) {
    const pass = bcrypt.hashSync(user.password, 12);
    user.password = pass;
    DB.registerUser(user)
      .then(id => {
        if (id) {
          res.status(201).json({ id });
        } else {
          res.status(400).json({ error: "User not created, try again." });
        }
      })
      .catch(err => {
        res.status(500).json({
          error: "Please check your connection and register again."
        });
      });
  }
});

router.post("/login", (req, res) => {
  const { user } = req.body;
  const email = user.email;
  const password = user.password;
  console.log(req);
  DB.loginUser(email)
    .then(dbUser => {
      if (dbUser) {
        if (bcrypt.compareSync(password, dbUser.password)) {
          const newUser = {
            id: dbUser.id,
            name: dbUser.name,
            email: dbUser.email,
            role: dbUser.role
          };
          const token = generateToken(newUser);
          res.json({ ...newUser, token });
        } else
          res.status(400).json({ error: "Credentials are wrong, try again." });
      }
    })
    .catch(err => {
      res.status(500).json({ error: "Connection lost, please try again." });
    });
});

module.exports = router;
