const db = require('./data/db');
const express = require('express');
const cors = require('cors');
const server = express();
server.use(express.json());

server.use(cors());

server.get('/notes', (req, res) => {
  db('notes')
    .then((notes) => {
      res.status(200).json(notes);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

server.get('/notes/:id', (req, res) => {
  const { id } = req.params;
  db('notes')
    .where({ id })
    .then((note) => {
      res.status(200).json(note);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

server.post('/notes', (req, res) => {
  const note = req.body;
  if (!note.title || !note.text)
    res.status(400).json({ errorMessage: 'Provide a title and text please' });
  db('notes')
    .insert(note)
    .then((ids) => {
      const id = ids[0];
      res.status(201).json({ id, ...note });
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

server.put('/notes/:id', (req, res) => {
  const { id } = req.params;
  const note = req.body;
  db('notes')
    .where({ id })
    .update(note)
    .then((note) => {
      res.status(201).json(note);
    })
    .catch((err) => res.status(500).json(err));
});

server.delete('/notes/:id', (req, res) => {
  const { id } = req.params;
  db('notes')
    .where({ id })
    .del()
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((err) => res.status(500).json(err));
});

const port = 5000;
server.listen(port, () => {
  console.log(`server on http://localhost:${port}`);
});
