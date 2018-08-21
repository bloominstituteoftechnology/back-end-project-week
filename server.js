const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");

const db = require("./db/db");

const server = express();

server.use(express.json());
server.use(helmet());
server.use(morgan("dev"));
server.use(cors());

server.get("/", (req, res) => {
  res.send("<h1>Hello<h1>");
});

server.get("/notes", (req, res) => {
  db("notes")
    .then(notes => {
      res.status(200).json(notes);
    })
    .catch(error => {
      res
        .status(500)
        .json({ error: "The notes information could not be retrieved" });
    });
});

server.get("/notes/:id", (req, res) => {
  const { id } = req.params;
  db("notes")
    .where("id", id)
    .then(note => {
      if (note.length === 0) {
        res
          .status(404)
          .json({ message: "The note with the specified ID does not exist" });
      }
      res.status(200).json(note);
    })
    .catch(error => {
      res
        .status(500)
        .json({ error: "The note information could not be retreived" });
    });
});

server.post("/notes", (req, res) => {
  const { title, textBody } = req.body;
  if (!title || !textBody) {
    res.status(400).json({ error: "Please provide title and textBody" });
  }
  db.insert({ title, textBody })
    .into("notes")
    .then(ids => {
      const id = ids[0];
      res.status(201).json({ title, textBody });
    })
    .catch(error => {
      res
        .status(500)
        .json({ error: "There was an error saving the note to the database" });
    });
});

server.delete("/notes/:id", (req, res) => {
  const { id } = req.params;
  db("notes")
    .where("id", id)
    .delete(id)
    .then(notes => {
      if (notes === 0) {
        res.status(404).json({
          message: "The note with the specified ID does not exist"
        });
      }
      res.status(200).json({ message: "note deleted" });
    })
    .catch(error => {
      res.status(500).json({ error: "The note could not be deleted" });
    });
});

server.put("/notes/:id", (req, res) => {
  const { id } = req.params;
  const { title, textBody } = req.body;
  if (!title || !textBody) {
    res.status(400).json({
      error: "Please provide title and textBody"
    });
  }
  db("notes")
    .where("id", id)
    .update({ title, textBody })
    .then(note => {
      if (!note) {
        res.status(404).json({
          error: "The note with the specified ID does not exist"
        });
      }
      res.status(200).json({ title, textBody });
    })
    .catch(error => {
      res
        .status(500)
        .json({ error: "The note information could not be modified" });
    });
});

server.listen(9000, () => console.log("API running..."));
