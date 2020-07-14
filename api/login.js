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
    username: user.username,
    department: ["marketing", "development"]
  };

  const secret = process.env.JWT_SECRET;
  const options = {
    expiresIn: "1h"
  };
  return jwt.sign(payload, secret, options);
}

router.post("/", (req, res) => {
  const creds = req.body;

  db("users")
    .where({ username: creds.username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(creds.password, user.password)) {
        const token = generateToken(user);

        res.status(200).json({ id: user.id, token });
      } else {
        res.status(401).json({ error: "Wrong Info" });
      }
    })
    .catch(err => res.status(500).json({ error: "there was an error" }));
});

module.exports = router;
