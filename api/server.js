const express = require('express');

const knex = require('knex');

const knexConfig = require('../knexfile.js');

const db = knex(knexConfig.development);

const server = express();

server.use(express.json());

// sanity check endpoint
server.get('/', (req, res) => {
    res.status(200).json({ api: 'up and running' });
});

//GET a list of notes
server.get('/api/notes', (req, res) => {
    db('notes')
      .then(notes => res.status(200).json(notes))
      .catch(err => res.status(500).json(err));
});

module.exports = server;