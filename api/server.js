const express = require("express");
const knex = require("knex");
const cors = require("cors");

const notes = require("../note.js");

const knexConfig = require("../knexfile.js")['production'];
const db = knex(knexConfig.development);

const server = express();
server.use(express.json());
server.use(cors());

const port = process.env.PORT || 5000;

server.get("/", (req, res) => {
  res.send(`API running on port: ${port}`);
});

server.get("/notes", (req, res) => {
  notes
    .getNotes()
    .then(note => {
      res.status(200).json(note);
    })
    .catch(error => {
      res.status(500).json({ error: "Cannot find the note" });
    });
});

server.post("/addNote", (req, res) => {
  const { title, content, id } = req.body;
  const note = { title, content };

  if (!note) {
    return res.status(422).sendDate({
      Message: "Please provide Title and Content."
    });
  }
  notes
    .addNote(note)
    .then(ids => {
      res.status(201).json({
        title: note.title,
        content: note.content,
        id: ids[0]
      });
    })
    .catch(error => {
      res.status(405).json({ error: "Cannot add a new note." });
    });
});

server.get("/notes/:id", (req, res) => {
  const { id } = req.params;

  db("notes")
    .where({ id })
    .then(note => {
      if (note.length !== 0) {
        res.status(200).json({ note });
      } else {
        res
          .status(404)
          .json({ message: "The note with the specified ID does not exist" });
      }
    })
    .catch(error => {
      res.status(500).json({ error: "Cant get notes data" });
    });
});

server.delete("/notes/:id", (req, res) => {
  const { id } = req.params;

  db("notes")
    .where({ id })
    .del()
    .then(note => {
      res.status(200).json(note);
    })
    .catch(error => {
      res.status(500).json({ error: "Cant delete note" });
    });
});

server.put("/notes/:id", (req, res) => {
  const changes = req.body;
  const { id } = req.params;

  db("notes")
    .where({ id })
    .update(changes)
    .then(note => {
      res.status(200).json({ note });
    })
    .catch(error => {
      res.status(500).json({ error: "cannot update the note" });
    });
});

module.exports = server;
