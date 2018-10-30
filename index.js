const express = require('express');
const db = require('./data/db');

const server = express();
server.use(express.json());

// simple GET request

server.get('/api/notes', (req, res) => {
  db('notes')
    .then(notes => {
      res.status(200).json(notes);
    })
    .catch(err => {
      console.log(err.message);
      res.status(500).json({ error: "Unable to retrieve notes at this time." });
    });
});

// server instantiation

const port = 8000;
server.listen(port, () => console.log(`Server listening on port ${port}.`));
