const express = require("express");
const helmet = require("helmet");
const knex = require("knex");

const dbConfig = require("./knexfile");

const db = knex(dbConfig.development);

const server = express();

server.use(helmet());
server.use(express.json());

server.get("/", (req, res) => {
  res.send("connected");
});

server.post("/api/notes", (req, res) => {
  if (!req.body.title || !req.body.content) {
    res.status(400).json({ error: "needs both title and content" });
  } else {
    db.insert(note)
      .into("notes")
      .then(ids => {
        res.status(201).json(ids);
      })
      .catch(err => res.status(500).json({ error: "note post fail" }));
  }
});

server.get("/api/notes", (req, res) => {
  db("notes")
    .then(notes => {
      res.status(200).json(notes);
    })
    .catch(err => res.status(500).json(err));
});

server.get("/api/notes/:id", (req, res) => {
  const { id } = req.params;
  db("notes")
    .where({ id: id })
    .then(note => {
      if (note.length === 0) {
        res.status(404).json({ message: "no note with that ID" });
      } else {
        res.status(200).json(note);
      }
    })
    .catch(err => res.status(500).json(err));
});

const port = 8000;
server.listen(port, function() {
  console.log(`\n=API ON ${port}=\n`);
});
