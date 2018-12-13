const express = require('express');
const server = express();
const db = require('../data/dbConfig');
const cors = require('cors');

server.use(express.json());
// server.use(cors({ origin: 'http://localhost:3000' }));
server.use(cors({ origin: 'https://lucid-minsky-dfb9d9.netlify.com' })); //netlify

// R O O T
server.get('/', (req, res) => {
  res.send('This is testing the deployed API');
});

// G E T   A L L   N O T E S
server.get('/api/notes', (req, res) => {
  db('notes')
    .then(note => res.status(200).json(note))
    .catch(err => res.status(500).json(err));
});

// G E T   B Y   I D
server.get('/api/notes/:id', (req, res) => {
  const { id } = req.params;

  db('notes')
    .where({ id: id })
    .first()
    .then(note => {
      if (note)
        db('notes')
          .where({ id: id })
          .then(note => {
            res.status(200).json(note);
          })
          .catch(err => res.status(500).json(err));
    });
});

// P O S T
server.post('/api/notes', (req, res) => {
  const { title, content } = req.body;
  db('notes')
    .insert({ title, content })
    .then(() => {
      res.status(201).json({ message: 'successfully added note' });
    })
    .catch(err => res.send(err));
});

// E D I T
server.put('/api/notes/:id', (req, res) => {
  const changes = req.body;
  const { id } = req.params;

  db('notes')
    .where({ id: id })
    .update(changes)
    .then(count => {
      res.status(200).json(count);
    })
    .catch(err => res.status(500).json(err));
});

server.delete('/api/notes/:id', (req, res) => {
  const { id } = req.params;

  db('notes')
    .where({ id: id })
    .del()
    .then(count => {
      res.status(200).json(count);
    })
    .catch(err => res.status(500).json(err));
});

module.exports = server;
