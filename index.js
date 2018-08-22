const express = require('express');
const db = require('./data/db');
const cors = require('cors');

const port = 4444;

const server = express();

server.use(cors());
server.use(express.json());

server.get('/', (req, res) => {
  res.send('The server is up and running.')
});

server.get('/api/notes', (req, res) => {
  db('notes')
  .then(notes => {
    res.status(200).json(notes);
  })
  .catch(err => res.status(500).json(err));
});

server.get('/api/notes/:_id', (req, res) => {
  const _id = req.params._id;
  db('notes')
    .where('_id', _id)
    .then(note => {
      res.status(200).json(note);
    })
    .catch(err => res.status(500).json(err));
});

server.post('/api/notes', (req, res) => {
  const note = req.body;

  db.insert(note).into('notes').then(ids => {
    const id = ids[0];
    res.status(201).json({ id, ...note})
  })
  .catch(err => res.status(500).json(err));
});

server.put('/api/notes/:_id', (req, res) => {
  const { _id } = req.params;
  const { title, textBody } = req.body;
  db('notes')
    .where('_id', _id)
    .update({ title, textBody })
    .then(changes => {
      res.status(200).json(changes);
    })
    .catch(err => res.status(500).json(err));
});

server.delete('/api/notes/:_id', (req, res) => {
  const { _id } = req.params;
  db('notes')
    .where('_id', _id)
    .del()
    .then(response => {
      res.status(200).json(response)
    })
    .catch(err => res.status(500).json(err));
});

server.listen(port, function() {
  console.log(`\n ==== Web API listening on http://localhost:${port} ==== \n`);
});