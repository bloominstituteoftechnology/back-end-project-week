const express = require('express');
const server = express();
const knex = require('knex');
const knexConfig = require('../knexfile');
const db = knex(knexConfig.development);

server.use(express.json());

//Test if server is running

server.get('/', (req, res) => {
    res.status(200).json({
        api: 'server is running!'
    })
})

//GET a list of notes

server.get('/api/notes', (req, res) => {
    db('notes')
    .then(notes => res.status(200).json(notes))
    .catch(error => res.status(500).json({
        message: 'failed to get notes'
    }))
})

//GET notes by id

server.get('/api/notes/:id', (req, res) => {
    const { id } = req.params;
    db('notes')
    .where({ id: id })
    .then(notes => res.status(200).json(notes))
    .catch(error => res.status(500).json({ message: "can't find note by that id"}))
})



module.exports = server;