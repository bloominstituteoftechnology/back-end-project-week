const express = require("express");
const knex = require("knex");

const notes = require("../note.js");

const knexConfig = require("../knexfile.js");
const db = knex(knexConfig.development);

const server = express();
server.use(express.json());

server.get("/", (req, res) => {
  res.status(200).json({ message: "api: up" });
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
  const { title, content } = req.body;
  const note = { title, content };

  if (!note) {
    return res
      .status(422)
      .sendDate({
        Message: "Please provide Title and Content."
      });
  }
  notes
    .addNote(note)
    .then(ids => {
      res
        .status(201)
        .json({
          title: note.title,
          content: note.content
        });
    })
    .catch(error => {
      res.status(405).json({ error: "Cannot add a new note." });
    });
});

server.get('/notes/:id', (req, res) => {
    const { id } = req.params;

    db('notes').where({ id }).then(note => {
        if (note.length !== 0) {
            res.status(200).jsonp(note);
        } else {
            res.status(404).jsonp({ message: 'The note with the specified ID does not exist'});
        }
    }).catch(error => {
        res.status(500).jsonp({ error: 'Cant get notes data'});
    })
})

server.delete('/notes/:id', (req, res) => {
    const { id } = req.params;

    db('notes').where({ id }).del().then(note => {
        res.status(200).jsonp(note);
    }).catch(error => {
        res.status(500).jsonp({ error: 'Cant delete note'});
    })
})

module.exports = server;
