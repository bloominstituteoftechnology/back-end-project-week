const express = require('express');
const server = express();
const knex = require('knex');
const knexConfig = require('../knexfile');
const db = knex(knexConfig.development);

server.use(express.json());

server.get('/', (req, res) => {
    res.status(200).json({
        api: 'server is running!'
    })
})


server.get('/api/notes', (req, res) => {
    db('notes')
    .then(notes => res.status(200).json(notes))
    .catch(error => res.status(500).json({
        message: 'failed to get notes'
    }))
})


module.exports = server;