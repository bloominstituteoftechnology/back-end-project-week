const db = require("./data/dbConfig");
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const server = express();

server.use(express.json());
server.use(morgan("dev"));
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
  const newNote = {
    title: req.body.title,
    textBody: req.body.textBody
  };
  db("notes")
    .insert(newNote)
    .then(ids => {
      // !ids[0]
      //   ? res.status(400).json({error: "title required"})
      //   : // : res.status(201).json(ids);
      return ids[0];
    })
    .then(id => {
      db("notes")
        .where({id})
        .first()
        .then(note => res.status(200).json(note));
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
        ? res
            .status(200)
            .json({id, title: changes.title, textBody: changes.textBody})
        : res
            .status(404)
            .json({error: "note does not exist or has been deleted"});
    })
    .catch(err => res.status(500).json(err));
});

module.exports = {server};
