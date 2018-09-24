const express = require('express');

const server = express(); 

const db = require('./dbConfig');

server.get("/", (req, res) => {
  res.send("Hello World")
});

server.get("/notes", (req, res) => {
  db('notes')
    .then(notes => {
      res.status(200).json(notes)
    })
    .catch(error => {
      res.status(500).json({error: error.message})
    })
})

server.listen(8080, () => console.log("API running on port 8080"));
