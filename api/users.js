const express = require("express");
const knex = require("knex");
const knexConfig = require("../knexfile");
const db = knex(knexConfig.development);
const router = express.Router();
const bcrypt = require("bcryptjs");

router.get("/", (req, res) => {
  // const creds = req.body;

  // const hash = bcrypt.hashSync(creds.password, 15);

  // creds.password = hash;

  db("users")
    .select("id", "username", "created_at", "updated_at")
    .then(users => res.status(201).json(users))
    .catch(err => res.status(500).json(err));
});

module.exports = router;
