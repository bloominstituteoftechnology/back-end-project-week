const express = require('express');
const knex = require('knex');
const knexConfig = require('./knexfile')
const db = knex(knexConfig.development)
const server = express()
const cors = require('cors')
server.use(cors())
server.use(express.json())

server.get('/', (req, res) => {
    res.status(200).json({ api: 'running' });
});

server.get('/api/notes', (req, res) => {
    db('notes')
        .then(note => res.status(200).json(note))
        .catch(error => res.status(500).json(error))
})

server.get('/api/notes/:id', (req, res) => {
    const { id } = req.params;
    db('notes')
        .where({ id: id })
        .then(note => res.status(200).json(note))
        .catch(error => res.status(500).json(error));
})
const port = 8000;
server.listen(port, () => console.log(`running on port: ${port}`))