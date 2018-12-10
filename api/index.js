const express = require('express');
const middleware = require('./middlewareConfig/middleware.js')

const knex = require('knex');
const knexConfig = require('../knexfile');
const db = knex(knexConfig.development);

const server = express();
middleware(server);

server.get('/api/notes', (req, res) => {
    db('notes')
    .then(foundNotes => {
        res.json(foundNotes)
    })
    .catch(err => {
        res.json({ message: "No notes found"})
    })
})


module.exports = server;
