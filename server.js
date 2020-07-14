require("dotenv").config();

const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");

const db = require("./db/db");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const server = express();

server.use(express.json());
server.use(helmet());
server.use(morgan("dev"));
server.use(cors({ origin: "http://localhost:3000", credentials: true }));

server.get("/", (req, res) => {
  res.send("Hello");
});

server.get("/notes", (req, res) => {
  db("notes")
    .then(notes => {
      res.status(200).json(notes);
    })
    .catch(error => {
      res
        .status(500)
        .json({ error: "The notes information could not be retrieved" });
    });
});

server.get("/notes/:id", (req, res) => {
  const { id } = req.params;
  db("notes")
    .where("id", id)
    .then(note => {
      if (note.length === 0) {
        res
          .status(404)
          .json({ message: "The note with the specified ID does not exist" });
      }
      res.status(200).json(note);
    })
    .catch(error => {
      res
        .status(500)
        .json({ error: "The note information could not be retreived" });
    });
});

server.post("/notes", (req, res) => {
  const { title, textBody } = req.body;
  if (!title || !textBody) {
    res.status(400).json({ error: "Please provide title and textBody" });
  }
  db.insert({ title, textBody })
    .into("notes")
    .then(ids => {
      const id = ids[0];
      res.status(201).json({ title, textBody });
    })
    .catch(error => {
      res
        .status(500)
        .json({ error: "There was an error saving the note to the database" });
    });
});

server.delete("/notes/:id", (req, res) => {
  const { id } = req.params;
  db("notes")
    .where("id", id)
    .delete(id)
    .then(notes => {
      if (notes === 0) {
        res.status(404).json({
          message: "The note with the specified ID does not exist"
        });
      }
      res.status(200).json({ message: "note deleted" });
    })
    .catch(error => {
      res.status(500).json({ error: "The note could not be deleted" });
    });
});

server.put("/notes/:id", (req, res) => {
  const { id } = req.params;
  const { title, textBody } = req.body;
  if (!title || !textBody) {
    res.status(400).json({
      error: "Please provide title and textBody"
    });
  }
  db("notes")
    .where("id", id)
    .update({ title, textBody })
    .then(note => {
      if (!note) {
        res.status(404).json({
          error: "The note with the specified ID does not exist"
        });
      }
      res.status(200).json({ title, textBody });
    })
    .catch(error => {
      res
        .status(500)
        .json({ error: "The note information could not be modified" });
    });
});

function generateToken(user) {
  const payload = {
    username: user.usernameInput
  };
  const options = {
    expiresIn: "1h",
    jwtid: "8728391"
  };
  return jwt.sign(payload, process.env.SECRET, options);
}
function protected(req, res, next) {
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token, process.env.SECRET, (err, decodedToken) => {
      if (err) {
        return res.status(401).json({ err: "token invalid" });
      }
      req.jwtToken = decodedToken;
      next();
    });
  } else {
    return res.status(401).json({ error: "no token" });
  }
}

server.post("/register", (req, res) => {
  const user = req.body;
  const hash = bcrypt.hashSync(user.passwordInput, 14);
  user.passwordInput = hash;
  db("users")
    .insert(user)
    .then(ids => {
      db("users")
        .where({ id: ids[0] })
        .first()
        .then(user => {
          const token = generateToken(user);
          res.status(201).json(token);
        });
    })
    .catch(error => {
      res.status(500).json({ error });
    });
});

server.post("/login", (req, res) => {
  const credentials = req.body;
  db("users")
    .where({
      usernameInput: credentials.usernameInput
    })
    .first()
    .then(user => {
      if (
        user &&
        bcrypt.compareSync(credentials.passwordInput, user.passwordInput)
      ) {
        const token = generateToken(user);
        res.send(token);
      } else {
        return res.status(401).json({ error: "Incorrect credentials" });
      }
    })
    .catch(error => {
      res.status(500).json({ error });
    });
});

server.get("/users", protected, (req, res) => {
  db("users")
    .then(users => {
      res.json(users);
    })
    .catch(err => res.send(err));
});

const PORT = process.env.PORT || 9000;
server.listen(PORT, () => console.log("API running..."));

module.exports = { server, db };
