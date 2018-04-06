const express = require("express");
const bcrypt = require("bcrypt");
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./src/models/User");
const Note = require("./src/models/Note");
const server = express();
const jwt = require("jsonwebtoken");
const { mysecret } = require("./config");
server.use(express.json());

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true
};

server.use(cors(corsOptions));

mongoose.Promise = global.Promise;
mongoose
  .connect("mongodb://localhost/notes")
  .then(connect => {
    console.log("Connected to mongo database");
  })
  .catch(err => {
    console.log(err);
  });

const PORT = 5000;

// ===User manipulation functionality===

server.get("/api/users", (req, res) => {
  User.find({}, (err, users) => {
    if (err) return res.send(err);
    res.send(users);
  });
});

server.get("/api/users/:id", (req, res) => {
  const userID = req.params.id;
  User.findById(userID)
    .then(user => {
      res.json(user);
    })
    .catch(err => {
      res.json(err);
    });
});

server.post("/api/users", (req, res) => {
  if (!req.body.username || !req.body.password || !req.body.email) {
    res.status(422).json({ error: "Need username and password" });
  }
  const { username, password, email } = req.body;
  const user = new User({ username, password, email });
  // TODO: check if username exists
  user.save((err, user) => {
    if (err) return res.send(err);
    res.json({
      success: "User saved",
      user
    });
  });
});

// ===Log-in functionality===

server.post("/login", (req, res) => {
  const { username, password } = req.body;
  User.findOne({ username })
    .then(user => {
      if (user === null) {
        res.status(422).json({ error: "User does not exist in database" });
        return;
      }
      user.checkPassword(password, (nonMatch, hashMatch) => {
        if (nonMatch !== null) {
          res.status(422).json({ error: "passwords dont match" });
          return;
        }
        if (hashMatch) {
          const payload = { uID: user._id };
          const token = jwt.sign(payload, mysecret);
          res.json({ token });
        }
      });
    })
    .catch(err => {
      res.send(err);
    });
});

server.post("/logout", (req, res) => {
  res.status(200).json({ success: true });
});

// ===Notes functionality===

server.get("/api/notes", (req, res) => {
  Note.find()
    .populate({ path: "user", select: "username" })
    .then(notes => {
      res.send(notes);
    })
    .catch(err => {
      res.send(err);
    });
});

server.post("/api/notes", (req, res) => {
  if (!req.body.title || !req.body.content || !req.body.user) {
    res.status(422).json({ error: "Missing a field" });
  }
  const { title, content, user } = req.body;
  const note = new Note({ title, content, user });
  note
    .save(note)
    .then(note => {
      res.json({
        success: "Note saved",
        note
      });
    })
    .catch(err => {
      res.send(err);
    });
});

server.delete("/api/notes/delete/:id", (req, res) => {
  const id = req.params.id;
  Note.findByIdAndRemove(id)
    .then(deletedNote => {
      if (deletedNote === null) {
        res.status(404).json({ errorMessage: "Note not found" });
      }
      res.status(200).json(deletedNote);
    })
    .catch(err => {
      res.send(err);
    });
});

server.put("/api/notes/update/:id", (req, res) => {
  const id = req.params.id;
  const changes = req.body;
  const { title, content, user } = changes;
  if (!title || !content || !id) {
    res.status(400).json({ errorMessage: "Please fill in all forms" });
  }
  Note.findByIdAndUpdate(id, changes, { new: true })
    .then(updatedNote => {
      if (updatedNote === null) {
        res.status(404).json({ errorMessage: "Note not found" });
      }
      res.status(200).send(updatedNote);
    })
    .catch(err => {
      res.send(err);
    });
});

server.listen(PORT, (req, res) => {
  console.log("Server listening on: ", PORT);
});
