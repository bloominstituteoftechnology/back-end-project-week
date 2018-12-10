const express = require("express");

const db = require("./data/dbConfig.js");

const server = express();

server.use(express.json());

// Checking to see if server works
server.get("/", (req, res) => {
  res.status(200).json({ message: "Up and running" });
});

// Grab the data from the notes table

server.get("/notes", (req, res) => {
  db("notes")
    .then(notes => {
      res.status(200).json(notes);
    })
    .catch(err => {
      res.status(500).json({ message: "There was an error, please try again" });
    });
});

// Creates a note and places the data into the notes table
server.post("/notes", (req, res) => {
  const { title, message } = req.body;
  if (!title || !message) {
    res.status(422).json({ message: "Please include a title and message" });
  } else {
    db("notes")
      .insert(req.body)
      .then(id => {
        res.status(201).json(id);
      })
      .catch(err => {
        res.status(500).json({
          message: "There was an error, please try again."
        });
      });
  }
});

module.exports = server;
