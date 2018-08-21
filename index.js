const express = require('express');
const db = require('./data/db')

const server = express();
server.use(express.json());
const PORT = 8000;

server.get('/', (req, res) => {
  res.send('Sanity Check');
});

server.post('/api/notes', (req, res) => {
  const note = req.body;
  db.insert(note).into('notes')
    .then(response => {
      res.status(201).json(response);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

server.get('/api/notes', (req,res) => {
  db('projects')
    .then(response => {
      res.status(200).json(response);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

server.get('api/notes/:id', (req, res) => {
  const id = req.params.id;
  db('projects').where('id', id)
    .then(response => {
      res.status(200).json(response);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

server.listen(PORT, () => {
  console.log(`UP and RUNNING on ${PORT}`)
});