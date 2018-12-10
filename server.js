const express = require('express');
const knex = require('knex');
const knexConfig = require('./knexfile.js');
const db = knex(knexConfig.development);
const cors = require('cors');

const server = express();
server.use(express.json());

// server test
server.get('/', (req, res) => {
    res.send({ API: 'is live' });
});

// get all notes
server.get('/api/notes/all', (req, res) => {
    db('notes')
        .then(notes => {
            res.status(200).json(notes);
        })
        .catch(error => {
            res.status(500).json({ message: 'could not find notes', error });
        });
});

module.exports = server;