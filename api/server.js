require("dotenv").config();

// import dependencies
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// internal imports
const notesRouter = require("../notes/notesRouter");
const tagsRouter = require("../tags/tagsRouter");
const db = require("../data/dbConfig");

// init server
const server = express();

//middleware
server.use(helmet());
server.use(cors());
server.use(express.json());

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

// endpoints for notes via router
server.use("/api/notes", notesRouter);
// endpoints for tags via router
server.use("/api/tags", tagsRouter);

// register new user
server.post("/api/register", (req, res) => {
  const user = req.body;

  if (!user.username || !user.password) {
    res.status(422).json({
      message: "Fill out both username and password fields before registering."
    });
  } else {
    const hash = bcrypt.hashSync(user.password, 14);
    user.password = hash;
    console.log(user, "OUTSIDE POST BLOCK");
    db("users")
      .returning("id")
      .insert(user)
      .then(id => {
        console.log(id, "ID HERE");
        db("users")
          .where({ id: id[0].id })
          .first()
          .then(user => {
            if (user) {
              const token = generateToken(user);
              res.status(201).json({ token });
            } else {
              throw new Error();
            }
          })
          .catch(err => {
            throw new Error();
          });
      })
      .catch(err =>
        res
          .status(500)
          .json({ error: "Error while registering new user: ", err })
      );
  }
});

// login
server.post("/api/login", (req, res) => {
  const creds = req.body;

  if (!creds.username || !creds.password) {
    res
      .status(422)
      .json({ message: "Fill all fields before attempting to log in" });
  } else {
    db("users")
      .where({ username: creds.username })
      .first()
      .then(user => {
        if (user && bcrypt.compareSync(creds.password, user.password)) {
          const token = generateToken(user);
          res.status(200).json({ token });
        } else {
          res.status(401).json({
            message: "Access denied, either password or username are incorrect"
          });
        }
      })
      .catch(err =>
        res.status(500).json({ error: "Error during login attempt: ", err })
      );
  }
});

module.exports = server;
