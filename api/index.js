const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");

const db = require("./database/dbConfig.js");

const server = express();

server.use(express.json());
server.use(cors());
server.use(helmet());

// GET
server.get("/api/notes", (req, res) => {
    db("notes")
      .then(notes => {
        res.status(200).json(notes);
      })
      .catch(err => {
        res.status(500).json({ error: "The notes could not be retrieved." });
      });
  });
  
// GET BY ID
  server.get("/api/notes/:id", (req, res) => {
    const { id } = req.params;
    db("notes")
      .where({ id: id })
      .then(note => {
        if (note.length === 0) {
          res.status(404).json({
            message: "The note with the specified ID does not exist.",
          });
        } else {
          return res.status(200).json(note);
        }
      })
      .catch(err => {
        res.status(500).json({ error: "The note could not be retrieved." });
      });
  });
  // end
  
  // server sanity check
  server.get("/", (req, res) => {
    res.send("Server is humming along nicely.");
  });

  server.listen(3300, () => console.log("\nrunning on port 3300\n"));
  