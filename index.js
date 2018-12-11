const express = require('express');
const knex = require('knex');
const cors = require('cors');
const port = process.env.PORT || 8000;
const knexConfig = require('./knexfile.js');

const db = knex(knexConfig.development);

const server = express();

server.use(express.json());
server.use(cors());

server.get('/api/notes', async (req, res) => {
  db('notes')
    .then(notes => {
      res.status(200).json(notes);
    })
    .catch(err => res.status(500).json(err));
});

server.post('/api/notes', (req, res) => {
  const note = req.body;

  db('notes')
    .insert(note)
    .returning('id')
    .then(ids => {
      res.status(201).json(ids);
    })
    .catch(err => {
      res.status(500).json({ error: 'Error creating note' });
    });
});

server.get('/api/notes/:id', (req, res) => {
  const { id } = req.params;

  db('notes')
    .where({ id: id })
    .then(note => {
      res.status(200).json({ note });
    })
    .catch(err => res.status(500).json(err));
});

server.put('/api/notes/:id', (req, res) => {
  const changes = req.body;
  const { id } = req.params;

  db('notes')
    .where({ id: id })
    .update(changes)
    .then(count => {
      res.status(200).json({ count });
    })
    .catch(err => res.status(500).json(err));
});

server.delete('/api/notes/:id', (req, res) => {
  const { id } = req.params;

  db('notes')
    .where({ id: id })
    .del()
    .then(count => {
      res.status(200).json({ count });
    })
    .catch(err => res.status(500).json(err));
});

server.listen(port, () => {
  console.log(`Server ${port} is live`);
});
