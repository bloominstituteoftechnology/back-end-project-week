require('dotenv').config();
const express = require('express');
const helmet = require("helmet");
const cors = require('cors');
const knex = require("knex");
const bcrypt = require('bcryptjs');

const knexConfig = require("../knexfile");
const db = knex(knexConfig.development);
const noteRouter = require("../notes/noteRouter");
const userRouter = require("../users/userRouter");
const { authenticate, generateToken } = require('../middleware.js');
const secrets = require("../_secrets/keys.js");

const server = express();

server.use(express.json());
server.use(cors());
server.use(helmet());

// sanity check route
server.get("/", (req, res) => {
    res.status(200).json({api: "running"});
})

// note routes
server.use("/api/notes", noteRouter)

// user routes
server.use("/api/users", userRouter)

server.post("/api/register", (req, res) => {
  const creds = req.body;

  if (!creds.username) {
    return res.status(400).json({error: "Please enter a username."})
  }

  if (!creds.password) {
    return res.status(400).json({error: "Please enter a password."})
  }

  const hash = bcrypt.hashSync(creds.password, secrets.hash);
  creds.password = hash;

  db("users")
    .insert(creds)
    .then(ids => {
      db("notes")
        .insert({title: `Welcome to Lambda Notes, ${creds.username}`,
                content: "I hope you enjoy using this site.",
                user_id: ids[0]})
        .then(id => console.log(id))
        .catch(err => console.log(err))
      res.status(201).json({message: "welcome", ids})
    })
    .catch(err => res.status(401).json(err))
})

server.post("/api/login", (req, res) => {
  const creds = req.body;

  if (!creds.username) {
    return res.status(400).json({error: "Please enter a username."})
  }

  if (!creds.password) {
    return res.status(400).json({error: "Please enter a password."})
  }

  db('users')
    .where({ username: creds.username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(creds.password, user.password)) {
        const token = generateToken(user);
        res.status(200).json({ message: 'welcome!', token });
      } else {
        res.status(401).json({ message: 'you shall not pass!!' });
      }
    })
    .catch(err => res.json(err));
})


module.exports = server;