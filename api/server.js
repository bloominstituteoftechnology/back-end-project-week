const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());
server.use(morgan("short"));

const db = require("../database/dbConfig");

server.get("/", (req, res) => {
    res.send(
      "Hello this is:<h1>Back End Project Week </h1><h3>by Rob Salzberg</h3>"
    );
  });

server.get("/api/notes", (req, res) => {
    db("notes")
      .then(notes => {
        res.status(200).json(notes);
      })
      .catch(err => {
        res.status(500).json(err);
      });
  });

  server.get("/api/notes/:id", (req, res) => {
    const noteId = req.params.id;
  
    db("notes")
      .where("id", noteId)
      .then(note => {
        if (note.length) {
          res.status(200).json(note);
        } else {
          res
            .status(404)
            .json({ message: `Could not find a note with id ${noteId}` });
        }
      })
      .catch(err => {
        res.status(500).json({ message: "Could not get any notes." });
      });
  });

module.exports = {
    server
};