const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const db = require("./data/dbConfig.js");

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

const port = process.env.PORT || 9000;

// Checking to see if server works
server.get("/", (req, res) => {
  res.status(200).json({ message: `Up and running on port: ${port}` });
});

// Grab the data from the notes table

server.get("/notes/get/all", (req, res) => {
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

// View individual notes by id

server.get("/notes/get/:id", (req, res) => {
  const { id } = req.params;
  db("notes")
    .where("id", id)
    .then(note => {
      if (!note.length) {
        res
          .status(404)
          .json({ message: "Could not find note with specified Id" });
      } else {
        res.status(200).json(note);
      }
    })
    .catch(err => {
      res.status(500).json({ message: "There was an error, please try again" });
    });
});

// Edit individual notes

server.put("/note/edit/:id", (req, res) => {
  const changes = req.body;
  const { id } = req.params;

  if (changes.title === "" || changes.message === "") {
    res.status(400).json({ message: "Please Include a title and message" });
  } else {
    db("notes")
      .where({ id })
      .update(changes)
      .then(count => {
        res.status(200).json({ message: `Updated ${count} notes` });
      })
      .catch(err => {
        res
          .status(500)
          .json({ message: "There was an error, please try again" });
      });
  }
});

// Deletes individual notes by their id

server.delete("/notes/:id", (req, res) => {
  const { id } = req.params;

  db("notes")
    .where({ id })
    .del()
    .then(count => {
      if (count === 0) {
        res
          .status(404)
          .json({ message: "Could not find note with specified id" });
      } else {
        res.status(200).json({ message: `deleted: ${count} note` });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "There was an error, please try again" });
    });
});

module.exports = server;
