require("dotenv").config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const db = require("./data/dbConfig");
const notesRouter = require("./notes/notesRouter");

const server = express();

server.use(express.json());
server.use(cors());
server.use(helmet());

server.use("/note", notesRouter);

server.post("/register", (req, res) => {
  const creds = req.body;
  const hash = bcrypt.hashSync(creds.password, 14);
  creds.password = hash;
  db("users")
    .insert(creds)
    .then(id => res.status(201).json(id))
    .catch(err => res.status(500).json(err));
});

const generateToken = user => {
  const payload = {
    subject: user.id,
    useremail: user.email
  };
  const secret = process.env.JWT_SECRET;
  const options = {
    expiresIn: "1h"
  };
  return jwt.sign(payload, secret, options);
};

server.post("/login", (req, res) => {
  const creds = req.body;
  db("users")
    .where({ email: creds.email })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(creds.password, user.password)) {
        const token = generateToken(user);
        res
          .status(200)
          .json({ message: "Logged In Successful!", token: token });
      } else {
        res.status(401).json({ message: "You shall not pass!" });
      }
    })
    .catch(err => res.status(500).json(err));
});

server.get("/", (req, res) => res.send("Welcome to the Notes API Server!"));

module.exports = server;
