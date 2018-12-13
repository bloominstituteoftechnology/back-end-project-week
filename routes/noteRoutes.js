const express = require("express");
const db = require("../database/dbConfig");
const { protected } = require("../middleware/middleware");

const route = express();

//sanity check
route.get("/", (req, res) => {
  res.send(`API running on port: ${PORT}`);
});

//get a list of all of the notes
route.get("/api/notes", protected, (req, res) => {
  db("notes")
    .then(notes => {
      res.status(200).json(notes);
    })
    .catch(err => {
      res.status(500).json({ message: "The lists could not be received", err });
    });
});

//edit an existing note
route.put("/api/notes/:id", protected, (req, res) => {
  const { noteTitle, noteBody } = req.body;
  const { id } = req.params;
  db("notes")
    .where({ id })
    .update({ noteTitle, noteBody })
    .then(count => {
      db("notes")
        .where({ id })
        .first()
        .then(note => {
          res.status(200).json(note);
        });
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });
});

//add a new note
route.post("/api/notes", protected, (req, res) => {
  db("notes")
    .insert(req.body)
    .then(ids => ids[0])
    .then(id => {
      db("notes")
        .where({ id })
        .first()
        .then(note => {
          res.status(201).json(note);
        });
    })
    .catch(err => {
      res.status(500).json({ message: "There was an error posting the list to the database ", err });
    });
});

route.delete("/api/notes/:id", protected, (req, res) => {
  const { id } = req.params;
  db("notes")
    .where({ id: id })
    .del()
    .then(count => {
      res.status(200).json({ count });
    })
    .catch(err => {
      res.status(500).json({ error: "error deleting the note", err });
    });
});

module.exports = route;
