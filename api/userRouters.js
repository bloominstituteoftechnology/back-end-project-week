require("dotenv").config();

const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const db = require("../database/helpers/usersModel");

const { authenticate } = require("../config/auth");

const generateToken = user => {
  const payload = {
    ...user
  };

  const secret = process.env.SECRET;
  const options = {
    expiresIn: "1h"
  };

  return jwt.sign(payload, secret, options);
};

// REGISTER a user
router.post("/register", (req, res) => {
  const creds = req.body;
  const hash = bcrypt.hashSync(creds.password, 10);
  creds.password = hash;

  db.insert(creds)
    .then(id => {
      res.status(201).json({ message: `ID: ${id} created` });
    })
    .catch(err => res.status(500).json(err));
});

// LOGIN a user
router.post("/login", (req, res) => {
  const creds = req.body;

  db.get(creds.username)
    .then(user => {
      if (user && bcrypt.compareSync(creds.password, user.password)) {
        const token = generateToken(user);
        res.status(200).json({ message: "Logged in", token });
      } else {
        res.status(401).json({ message: "You shall not pass!" });
      }
    })
    .catch(err => res.status(500).json(err));
});

router.get("/users", authenticate, (_, res) => {
  db.get()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => res.status(500).json(err));
});

module.exports = router;
