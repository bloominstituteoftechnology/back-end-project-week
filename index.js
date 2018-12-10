const express = require('express');
const cors = require('cors');
const knex = require('knex');
const knexConfig = require('./knexfile.js');
const db = knex(knexConfig.development);

const server = express();
server.use(express.json());
server.use(cors());

server.get('/', (req, res) => {
  res.send('Server is Running!');
});

server.get('/api/notes', (req, res) => {
  db('notes')
    .then(notes => {
      res.status(200).json(notes);
      console.log(notes);
    })
    .catch(err => {
      res.status(500).json({ err: 'Cannot retrieve these notes!' });
    })
});

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Server listening on port ${port} ===\n`);
});