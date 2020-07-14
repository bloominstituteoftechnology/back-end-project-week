require("dotenv").config();
const express = require("express");
const knex = require("knex");
const knexConfig = require("../knexfile");
const db = knex(knexConfig.development);
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// generate JWT token
function generateToken(user) {
  const payload = {
    subject: user.id,
    username: user.username
  };

  const secret = process.env.JWT_SECRET;
  const options = {
    expiresIn: "1h"
  };
  return jwt.sign(payload, secret, options);
}

router.post("/", (req, res) => {
  const creds = req.body;

  const hash = bcrypt.hashSync(creds.password, 15);

  creds.password = hash;

  db("users")
    .insert(creds)
    .then(ids => {
      const token = generateToken(ids);
      res.status(201).json({ id: ids[0], token });
    })
    .catch(err => res.status(500).json(err));
});

module.exports = router;
