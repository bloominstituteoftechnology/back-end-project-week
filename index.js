const express = require('express');
const cors = require('cors')
const knex = require('knex')
const knexConfig = require('./knexfile')
const db = knex(knexConfig.development)
const server = express();
server.use(express.json());
server.use(cors());
server.get('/', (req, res) => {
    res.send('Hello')
})

server.get('/api/notes', (req, res) => {
    db('notes')
    .then(notes => {
        res.status(200).json(notes)
    })
    .catch(err => {
        res.status(500).json(err)
    })
})

server.get('/api/notes/:id', (req, res) => {
    const { id } = req.params;
    db('notes')
    .where({id})
    .then(note => {
        res.status(200).json(note)
    })
    .catch(err => {
        res.status(500).json(err)
    })
})
server.post('/api/notes', (req, res) => {
    const note  = req.body;
    db('notes')
    .insert(note)
    .then(ids => {
        res.status(201).json(ids)
    })
    .catch(err => {
        res.status(500).json(err)
    })
})


const port = 9000;
server.listen(port, () => console.log(`listening on port ${port}`))
