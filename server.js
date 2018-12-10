const db = require("./data/dbConfig");
const express = require("express");
const cors = require("cors");
const server = express();

server.use(express.json());
server.use(cors());

server.get("/", (req, res) => {
  res.status(200).send("Server is alive!");
});

server.get("/notes", (req, res) => {
  db("notes")
    .then(notes => res.status(200).json(notes))
    .catch(err => res.status(500).json(err));
});

server.post("/notes", (req, res) => {
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

server.get("/notes/:id", (req, res) => {
  const {id} = req.params;
  console.log(id);
  db("notes")
    .where({id})
    .first() //without .first(), error will return an empty array
    .then(note => {
      !note
        ? res
            .status(404)
            .json({error: "note does not exist or has been deleted"})
        : res.status(200).json(note);
    })
    .catch(err => res.status(500).json(err));
});

server.delete("/notes/:id", (req, res) => {
  const {id} = req.params;
  db("notes")
    .where({id})
    .del()
    .then(count => {
      console.log(count);
      count > 0
        ? res.status(200).json({success: `${count} note deleted`})
        : res
            .status(404)
            .json({error: "note does not exist or has been deleted"});
    })
    .catch(err => res.status(500).json(err));
});

server.put("/notes/:id", (req, res) => {
  const {id} = req.params;
  const changes = req.body;
  db("notes")
    .where({id})
    .update(changes)
    .then(count => {
      count > 0
        ? res.status(200).json({success: `updated ${count} note`})
        : res
            .status(404)
            .json({error: "note does not exist or has been deleted"});
    })
    .catch(err => res.status(500).json(err));
});

module.exports = {server};
