const express = require("express");
const db = require("./db/helpers");
const server = express();
const cors = require("cors");

server.use(express.json());
server.use(cors());

//ERROR HANDLING MIDDLEWARE
//not quite sure how to implement but here's what I have

server.get("/", (req, res) => {
  res.send("Server Works");
});

server.get("/notes", (req, res) => {
  db.getNotes()
    .then(notes => {
      res.status(200).json(notes);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

server.get("/notes/:id", (req, res) => {
  const { id } = req.params;

  db.getNotes({ id })
    .then(note => {
      res.status(200).json(note);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

server.post("/notes", (req, res) => {
  const body = req.body;

  db.createNote(body)
    .then(id => {
      res.status(201).json(id);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

server.put("/notes/:id", (req, res) => {
  const body = req.body;
  const { title, contents } = req.body;
  const { id } = req.params;

  db.editNote({ id }, body)
    .then(note => res.status(200).json({ title, contents }))
    .catch(err => {
      res.status(500).json(err);
    });
});

server.delete("/notes/:id", (req, res) => {
  const { id } = req.params;

  db.deleteNote({ id })
    .then(notes => res.status(200).json(notes))
    .catch(err => {
      res.status(500).json(err);
    });
});

// server.use(function(res, status, msg, next) {
//     res.status(status).json({ msg });
//     next()
//   });

port = 9000;
server.listen(
  port,
  console.log(`\n ===> Server is running on port: ${port} <=== \n`)
);
