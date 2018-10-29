const express = require('express');
const cors = require('cors');
const knex = require('knex');

const knexConfig = require('./knexfile');
const db = knex(knexConfig.development);

const server = express();

server.use(express.json());
server.use(cors());

// sanity check
server.get('/', (req, res) => {
  res.send('It is working!');
});

server.get('/api/notes', (req, res) => {
  db('notes')
    .then(notes => {
      res.status(200).json(notes);
    })
    .catch(err => {
      res.status(500).json({ error: 'The notes information could not be retrieved.', err });
    })
});

// listening port
const port = 5000;
server.listen(port, function() {
  console.log(`\n=== Server listening on port ${port} ===\n`);
});