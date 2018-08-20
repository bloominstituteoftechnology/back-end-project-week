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
  db("notes").then(notes => {
    res.status(200).json(notes);
  });
});

server.get("/notes/:id", (req, res) => {
  const { id } = req.params;
  db("notes")
    .where("id", id)
    .then(note => {
      res.status(200).json(note);
    });
});

server.post("/notes", (req, res) => {
  const note = req.body;
  db.insert(note)
    .into("notes")
    .then(ids => {
      const id = ids[0];
      res.status(201).json({ id, ...note });
    });
});

server.delete("/notes/:id", (req, res) => {
  const { id } = req.params;
  db("notes")
    .where("id", id)
    .delete()
    .then(notes => {
      res.status(200).json({ message: "note deleted" });
    });
});

server.put("/notes/:id", (req, res) => {
  const { id } = req.params;
  const note = req.body;
  db("notes")
    .where("id", id)
    .update(note)
    .then(response => {
      res.status(200).json(note);
    });
});

server.listen(9000, () => console.log("API running..."));
