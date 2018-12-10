const express = require('express');
const server = express();
server.use(express.json());
const knex = require('knex')
const knexConfig = require('./knexfile.js')
const db = knex(knexConfig.development)
const cors = require('cors')
server.use(cors())


server.get('/notes', (req, res) => {

    db('notes')
        .then(notes => {
            res.status(200).json(notes)
        })
        .catch(err => {
            res.status(500).json({ message: 'Server error', err })
        })
})

module.exports = server;