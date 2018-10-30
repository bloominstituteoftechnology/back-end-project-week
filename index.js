const express = require('express');
const db = require('./data/db');

const server = express();
server.use(express.json());

// simple GET request for all notes

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

// GET request for an individual note

server.get('/api/notes/:id', (req, res) => {
  const { id } = req.params;

  db('notes')
    .where('id', id)
    .then(check => {
      if (!check.length) {
        res
          .status(401)
          .json({ error: 'Invalid ID! Please try again.' });
      }
      res.status(200).json(check)
    })
    .catch(err => {
      console.log(err.message);
      res.status(500).json({ error: 'The note could not be retrieved.' });
    });
});

// server instantiation

const port = 8000;
server.listen(port, () => console.log(`Server listening on port ${port}.`));
