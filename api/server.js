const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());
server.use(morgan("short"));

const db = require("../database/dbConfig");

server.get("/", (req, res) => {
  res.send(
    "Hello this is:<h1>Back End Project Week </h1><h3>by Rob Salzberg</h3>"
  );
});

server.get("/api/notes", (req, res) => {
  db("notes")
    .then(notes => {
      res.status(200).json(notes);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

server.get("/api/notes/:id", (req, res) => {
  const noteId = req.params.id;

  db("notes")
    .where("id", noteId)
    .then(note => {
      if (note.length) {
        res.status(200).json(note);
      } else {
        res
          .status(404)
          .json({ message: `Could not find a note with id ${noteId}` });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "Could not get any notes." });
    });
});

server.post("/api/notes", (req, res) => {
  const note = req.body;
  if (note === "") {
    res.status(500).json({ error: "Please enter a note" });
  } else {
    db.insert(note)
      .into("notes")
      .then(id => {
        res.status(200).json(id);
      })
      .catch(err => {
        res.status(500).json({ error: "Problem posting note" });
      });
  }
});

server.put("/api/notes/:id", (req, res) => {
  const updates = req.body;
  const { id } = req.params;

  db("notes")
    .where({ id })
    .update(updates)
    .then(count => {
      res.status(200).json(`${count} note in the database was updated.`);
    })
    .catch(err => {
      res.status(500).json({ message: "Error editing note." }, err);
    });
}),
server.delete("/api/notes/:id", (req, res) => {
   const { id } = req.params;
  db("notes")
    .where('id', id)
    .del()
    .then(count => {
      res.status(201).json(`${count} note was deleted from the database.`);
    })
    .catch(err => {
      res.status(500).json({ message: "Error deleting note." }, err);
    });
}),
  module.exports = {
    server
  };
