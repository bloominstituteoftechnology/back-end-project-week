const express = require('express');
const db = require('./data/db');

const port = 4444;

const server = express();

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

server.listen(port, function() {
  console.log(`\n ==== Web API listening on http://localhost:${port} ==== \n`);
});