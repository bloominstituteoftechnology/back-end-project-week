const express = require("express");
const axios = require("axios");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const db = require("../../data/dbConfig");

const { authenticate } = require("../middleware/authMidware");

const jwtKey = process.env.JWT_KEY;

const router = express.Router();

function generateToken(user) {
  const payload = {
    subject: user.id,
    username: user.username
  };

  const options = {
    expiresIn: "1h"
  };

  return jwt.sign(payload, jwtKey, options);
}
router.get("/", (req, res) => {
  res.status(200).json({ message: "authentication-up" });
});

router.post("/register", (req, res) => {
  const creds = req.body;
  const hash = bcrypt.hashSync(creds.password, 8);
  creds.password = hash;

  db("users")
    .insert(creds)
    .then(id => {
      const user = db("users")
        .where({ id: id })
        .first();
      const token = generateToken(user);
      res.status(201).json({ message: "Registration Complete", token });
    })
    .catch(err => res.json(err));
});

router.post("/login", (req, res) => {
  const creds = req.body;

  db("users")
    .where({ username: creds.username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(creds.password, user.password)) {
        const token = generateToken(user);
        res.status(200).json({ message: "Logged In", token });
      } else {
        res.status(401).json({ message: "Invalid Login" });
      }
    })
    .catch(err => res.json(err));
});
module.exports = router;
