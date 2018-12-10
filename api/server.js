
const express = require('express');

const server = express();

const db = require('../data/dbConfig.js');

const cors = require('cors');

server.use(cors());
server.use(express.json());

server.get('/', (req, res) =>{
  res.status(200).json({ api: "Up and Running" })
});

server.get('/api/notes', (req, res) => {
  db('notes')
    .then(zoos => res.status(200).json(zoos))
    .catch(err => res.status(500).json(err));
});

server.get('/api/notes/:noteId', (req, res) => {
  const { noteId } = req.params;
  db('notes')
    .then(notes => res.status(200).json(ntoes))
    .catch(err => res.status(500).json(err));
});

server.post('/api/notes', (req, res) => {
  const note = req.body;

  db('notes')
    .insert(note)
    .then(ids => {
      res.status(201).json(ids);
    })
    .catch(err => {
      res.status(500).json({ message: 'Error inserting', err });
    });
});

server.get('/api/notes/:noteId', (req, res) => {
  const { noteId } = req.params;

  db('notes')
    .where({ id: noteId })
    .then(note => {
      res.status(201).json({ note });
    })
    .catch(err => res.status(500).json(err));
});

server.put('/api/notes/:noteId', (req, res) => {
  const changes = req.body;
  const { noteId } = req.params;

  db('notes')
    .where({ id: noteId })
    .update(changes)
    .then(count => {
      res.status(200).json({ count });
    })
    .catch(err => res.status(500).json(err));
});

server.delete('/api/notes/:noteId', (req, res) => {
  const { noteId } = req.params;

  db('notes')
    .where({ id: noteId })
    .del()
    .then(count => {
      res.status(200).json({ count });
    })
    .catch(err => res.status(500).json(err));
});

module.exports = server;