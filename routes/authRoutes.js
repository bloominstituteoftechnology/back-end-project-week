const express = require("express");
const authRoute = express();
const db = require("../database/dbconfig");
const bcrypt = require("bcryptjs");
const { generateToken } = require("../middleware/middleware");

//register a new user
authRoute.post("/api/register", (req, res) => {
  const creds = req.body;
  const hash = bcrypt.hashSync(creds.password, 10);
  creds.password = hash;
  db("users")
    .insert(creds)
    .then(ids => {
      res.status(201).json(ids);
    })
    .catch(err => {
      res.status(500).json({ message: "error adding user to the db", err });
    });
});

//user login
authRoute.post("/api/login", (req, res) => {
  const creds = req.body;
  db("users")
    .where({ username: creds.username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(creds.password, user.password)) {
        const token = generateToken(user);
        res.status(200).json({ message: "welcome", token });
      } else {
        res.status(401).json({ message: "not authorized" });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "error logging in", err });
    });
});
module.exports = authRoute;
