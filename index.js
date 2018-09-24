const express = require("express");
const db = require("./db/helpers");
const server = express();

server.use(express.json());

server.get("/", (req, res) => {
  res.send("Server Works");
});

server.get("/notes", (req, res) => {
  db.getNotes()
    .then(notes => {
      res.status(200).json(notes);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

server.get("/notes/:id", (req, res) => {
  const { id } = req.params;

  db.getNotes({id})
    .then(note => {
      res.status(200).json(note);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

port = 9000;
server.listen(
  port,
  console.log(`\n ===> Server is running on port: ${port} <=== \n`)
);
