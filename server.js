const express = require("express");
const cors = require("cors");
const db = require('./database/config.js');

const server = express();

server.use(express.json());
server.use(cors());

server.get("/", (req, res) => {
  db("notes")
    .then(notes => {
      res.status(200).json(notes);
    })
    .catch(err => res.status(500).json(err));
});

server.post("/form", (req, res) => {
  const note = req.body;

  db.insert(note)
    .into("notes")
    .then(ids => {
      res.status(201).json(ids);
    })
    .catch(err => res.status(500).json(err));
});

server.get("/note/:id", (req, res) => {
  db("notes")
    .where({ id: req.params.id })
    .then(note => {
      res.status(200).json(note);
    })
    .catch(err => res.status(500).json(err));
});

server.put("/note/:id", (req, res) => {
  const note = req.body;
  db("notes")
    .where({ id: req.params.id })
    .update(note)
    .then(note => {
      if (note) {
        res.status(200).json({ message: "Note Successfully Updated!" });
      } else {
        res.status(404).json({ message: "No Note with that ID was found." });
      }
    })
    .catch(err => res.status(500).json({ message: "Update Failed!" }));
});

server.delete('/note/:id', (req, res) => {
    db('notes').where({ id: req.params.id }).del().then(note => {
        if(note) {
            res.status(204).json({ message: 'Note Successfully Deleted!'});
        } else {
            res.status(404).json({ message: "No Note with that ID was found."});
        }
    })
    .catch(err => res.status(500).json(err));
})

module.exports = {
  server
};
