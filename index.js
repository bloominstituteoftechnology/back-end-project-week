const express = require('express');
const helmet = require('helmet');
const knex = require('knex');

const dbConfig = require('./knexfile');

const db = knex(dbConfig.development);

const server = express();

server.use(express.json());
server.use(helmet());

server.get('/', (req, res) => {
    res.send('API needs a break');
});

// get the list of notes
server.get('/api/notes', (req, res) => {
    db('notes')
        .then(notes => {
            res.status(200).json(notes);
        })
        .catch(err => res.status(500).json(err));
});


const port = 8000;
server.listen(port, function() {
    console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});