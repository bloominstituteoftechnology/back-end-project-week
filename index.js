const express = require("express");
const helmet = require("helmet");
const knex = require("knex");
const dbConfig = require("./knexfile");

const server = express();
const db = knex(dbConfig.development);

server.use(express.json());
server.use(helmet());
server.set("port", process.env.PORT || 8000);

server.get("/", (req, res) => {
  res.status(200).json({ api: "running" });
});

server.get("/api/notes", (req, res) => {
  db("notes")
    .then(data => {
      res.status(200).json(data);
    })
    .catch(err => {
      res.status(404).json(err);
    });
});

server.get("/api/notes/:id", (req, res) => {
  db("notes")
    .where({ id: req.params.id })
    .then(data => {
      if (data.length === 0) {
        res.status(404).json({ error: "Note not found" });
      } else {
        res.status(200).json(data);
      }
    })
    .catch(err => {
      res.status(404).json(err);
    });
});

server.post("/api/notes", (req, res) => {
  const newNote = req.body;

  if (newNote.title && newNote.contents) {
    db("notes")
      .insert(newNote)
      .then(response => {
        res.status(201).json(response);
      })
      .catch(err => {
        res.status(500).json(err);
      });
  } else {
    res.status(400).json({ error: "Request missing one or more parameters" });
  }
});

server.put("/api/notes/:id", (req, res) => {
  const edits = req.body;

  db("notes")
    .where({ id: req.params.id })
    .update(edits)
    .then(response => {
      if (response === 0) {
        res.status(404).json({ error: "Note not found" });
      } else {
        res.status(200).json(response);
      }
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

server.delete("/api/notes/:id", (req, res) => {
  db("notes")
    .where({ id: req.params.id })
    .del()
    .then(response => {
      if (response === 0) {
        res.status(404).json({ error: "Note not found" });
      } else {
        res.status(200).json(data);
      }
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

server.listen(server.get("port"), () => {
  console.log("== LISTENING ON PORT ", server.get("port"), " ==");
});
