const express = require("express");
const cors = require("cors");
const server = express();
const helmet = require("helmet");
const helper = require("./database/helpers");
const bcrypt = require("bcryptjs");
const session = require("express-session");

server.use(express.json(), cors());

server.get("/", (req, res) => {
  helper
    .getAllNotes()
    .then(projects => {
      res.json(projects);
    })
    .catch(err => {
      res
        .status(500)
        .json({ message: "Projects could not be retrieved at this time." });
    });
});

server.post('/create', (req, res) => {
    const note = req.body;
    helper.insertNote(note)
      .into('notes')
      .then(ids => {
        res.status(201).json(ids);
      })
      .catch(err => {
        res.status(500).json(err);
      });
  });


module.exports = server;
