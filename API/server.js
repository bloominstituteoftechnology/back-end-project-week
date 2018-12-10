const express = require("express");
const server = express();
const logger = require("morgan");
const db = require("../database/dbConfig");
const cors = require("cors");

server.use(logger("dev"));
server.use(express.json());
server.use(cors());

//get a list of all of the notes
server.get("/api/notes", (req, res) => {
  db("notes")
    .then(lists => {
      res.status(200).json(lists);
    })
    .catch(err => {
      res.status(500).json({ message: "The lists could not be received", err });
    });
});

//get a single note
server.get("/api/notes/:id", (req, res) => {
  const { id } = req.params;
  console.log(id);
  db("notes")
    .where({ id: id })
    .then(list => {
      if (list) {
        res.status(200).json(list);
      } else {
        res.status(404).json({ message: "The list with the specified id does not exist" });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "The list could not be recieved", err });
    });
});

//edit an existing note
server.put("/api/notes/:id", (req, res) => {
  const { noteTitle, noteBody } = req.body;
  const { id } = req.params;
  db("notes")
    .where({ id: id })
    .update({ noteTitle, noteBody })
    .then(count => {
      res.status(200).json(count);
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });
});

//add a new note
server.post("/api/notes", (req, res) => {
  db("notes")
    .insert(req.body)
    .then(note => {
      res.status(201).json(note);
    })
    .catch(err => {
      res.status(500).json({ message: "There was an error posting the list to the database ", err });
    });
});

server.delete("/api/notes/:id", (req, res) => {
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

module.exports = server;
