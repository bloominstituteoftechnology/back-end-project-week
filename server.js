const db = require("./data/dbConfig");
const express = require("express");
const cors = require("cors");
const server = express();

server.use(express.json());
server.use(cors());

server.get("/", (req, res) => {
  db("notes")
    .then(notes => res.status(200).json(notes))
    .catch(err => res.status(500).json(err));
});

server.post("/", (req, res) => {
  const newNote = req.body;
  db("notes")
    .insert(newNote)
    .then(ids => {
      !newNote
        ? res.status(400).json({error: "title required"})
        : res.status(201).json(ids);
    })
    .catch(err => res.status(500).json(err));
});

module.exports = {server};
