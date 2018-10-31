const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const knexConfig = require("./knexfile.js");
const knex = require("knex");
const db = knex(knexConfig.development);

const server = express();

server.use(express.json());
server.use(helmet());
server.use(cors());

//sanity check
server.get("/", (req, res) => {
  res.send("server is up");
});

server.get("/api/notes", (req, res) => {
  console.log("///this is fetchNotes///");
  db("notes")
    .then(notes => {
      res.status(200).json(notes);
    })
    .catch(err => res.status(500).json(err));
});

server.get("/api/notes/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const notes = await db("notes").where({ id });
    if (notes) {
      res.status(200).json(notes[0]);
    } else {
      res.status(404).json({ message: "note not found" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

server.post("/api/notes", (req, res) => {
  const note = req.body;
  db.insert(note)
    .into("notes")
    .then(ids => {
      res.status(201).json(ids);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

server.put("/api/notes/:id", (req, res) => {
  const { id } = req.params;
  const changes = req.body;
  db("notes")
    .where({ id: id })
    .update(changes)
    .then(count => {
      if (!count || count < 1) {
        res.status(404).json({ message: "No records found to update" });
      } else {
        res.status(200).json(count);
      }
    })
    .catch(err => res.status(500).json(err));
});

server.delete("/api/notes/:id", (req, res) => {
  const { id } = req.params;
  db("notes")
    .where({ id })
    .delete(id)
    .then(count => {
      if (!count || count < 1) {
        res.status(404).json({ message: "No notes found to delete" });
      } else {
        res.status(200).json(count);
      }
    })
    .catch(err => res.status(500).json(err));
});

server.listen(8000, () => console.log("/n server up on port 8000 /n"));
