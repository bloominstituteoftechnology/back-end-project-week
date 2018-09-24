const express = require("express");

const knex = require("knex");
const dbConfig = require("./knexfile");
const db = knex(dbConfig.development);

const server = express();

server.use(express.json());

server.get("/", (req, res) => {
  res.send("API RUNNING...");
});

server.get("/notes", (req, res) => {
  db("notes")
    .then(notes => {
      res.status(200).json(notes);
    })
    .catch(err => res.status(500).json(err));
});

server.get("/notes/:id", (req, res) => {
  const { id } = req.params;

  db("notes")
    .where("id", "=", id)
    .then(note => {
      if (note.length > 0) {
        res.status(200).json(note);
      } else {
        res.status(401).json({
          message: "the note with the specified ID does not exist"
        });
      }
    })

    .catch(err => {
      res.status(500).json({ error: "note info could not be retrieved" });
    });
});

server.post("/notes", (req, res) => {
  const note = req.body;
  const { title } = req.body;
  const { content } = req.body;
  if (!title & !content) {
    res
      .status(400)
      .json({ errorMessage: "please add notes title and content" });
  }

  db.insert(note)
    .into("notes")
    .then(ids => {
      res.status(201).json(ids);
    })
    .catch(err => res.status(500).json(err));
});

server.delete("/notes/:id", (req, res) => {
  const { id } = req.params;
  db("notes")
    .where({ id })
    .del()
    .then(count => {
      res.status(200).json(count);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

server.put("/notes/:id", (req, res) => {
  const changes = req.body;
  const { id } = req.params;

  db("notes")
    .where("id", "=", id)
    .update(changes)
    .then(count => {
      res.status(200).json(count);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

server.listen(8000);
