const express = require('express');
const helmet = require('helmet');
const knex = require('knex');

const dbConfig = require('./knexfile');
const db = knex(dbConfig.development);

const server = express();

server.use(helmet());
server.use(express.json());

server.get('/', (req,res) => {
    res.send('API for notetaking app is running')
});

server.post('/api/notes', (req,res) => {
    const note = req.body;

    db
    .insert(note)
    .into('notes')
    .then(ids => {
        res.status(201).json(ids);
    })
    .catch(err => res.status(500).json(err));
})

server.listen(9000);