const express = require('express');
const cors = require('cors');
const knex = require('./db/config.js');

const server = express();
const port = process.env.PORT || 9000;
server.use(express.json());
server.use(cors());

server.get('/', (req, res) => {
  res.send(`Notes API running on port: ${port}`);
});

server.get('/api/notes', (req, res) => {
  knex('notes')
    .then(notes => {
      res.status(200).json(notes);
    })
    .catch(err => {
      res.status(500).json({ message: 'Error retrieving notes' });
    });
});

server.get('/api/notes/:id', (req, res) => {
  const { id } = req.params;
  knex('notes')
    .where('id', id)
    .then(note => {
      res.status(200).json(note);
    })
    .catch(err => {
      res.status(500).json({ message: 'Error getting project' });
    });
});

server.post('/api/notes', (req, res) => {
  const note = req.body;

  knex
    .insert(note)
    .into('notes')
    .then(response => {
      console.log(response);
      console.log(response[0]);
      res
        .status(201)
        .json({ id: response[0], message: 'New note successfully created' });
    })
    .catch(err => {
      res.status(500).json({ message: 'Error creating note' });
    });
});

server.put('/api/notes/:id', (req, res) => {
  const { id } = req.params;
  const data = req.body;
  knex('notes')
    .where({ id })
    .update(data)
    .then(count => {
      console.log(count);
      if (count < 1) {
        res.status(400).json({ message: 'ID not found' });
      }
      res.status(200).json({ message: 'Note updated' });
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

server.delete('/api/notes/:id', (req, res) => {
  const { id } = req.params;
  knex('notes')
    .where({ id })
    .del()
    .then(count => {
      if (count < 1) {
        res.status(400).json({ message: 'Note not found' });
      }
      res.status(200).json({ message: 'Note deleted' });
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

module.exports = server;
