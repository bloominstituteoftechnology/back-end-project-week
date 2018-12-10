const express = require('express');
const knex = require('knex');

const notes = require('../note.js')

const knexConfig = require('../knexfile.js');
const db = knex(knexConfig.development);

const server = express();
server.use(express.json());

server.get('/', (req, res) => {
    res.status(200).json({ message: 'api: up' });
})

server.get('/notes', (req, res) => {
    notes
        .getNotes()
        .then(note => {
            res.status(200).json(note);
        }).catch(error => {
            res.status(500).json({ error: 'Cannot find the note' });
        });
})

module.exports = server;