const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const db = require("./data/dbConfig.js");

const server = express();
const corsOptions = {
  credentials: true,
  origin: "http://localhost:3000"
};

server.use(express.json());
server.use(cors(corsOptions));
server.use(helmet());

//custom middleware

function checkForResource(req, res, resource) {
  if (resource.length > 0) {
    res.status(200).json(resource);
  } else {
    res
      .status(404)
      .json({ message: "The resource does not exist or is currently empty." });
  }
}

server.get("/", (req, res) => {
  res.send("This is working...");
});

server.get("/api/notes", (req, res) => {
  db("notes")
    .then(notes => {
      checkForResource(req, res, notes);
    })
    .catch(err => {
      console.log("error", err);
      res
        .status(500)
        .json({ error: "The notes information could not be retrieved." });
    });
});

server.post("/api/notes", (req, res) => {
  const note = req.body;
  db.insert(note)
    .into("notes")
    .then(id => {
      res.status(201).json(id);
    })
    .catch(err => {
      console.log("error", err);
      res.status(500).json({
        error: "There was an error saving the note to the database."
      });
    });
});

module.exports = {
  server
};
