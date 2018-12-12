const express = require('express');
const middleware = require('./middlewareConfig/middleware.js')

const knex = require('knex');
const knexConfig = require('../knexfile');
const db = knex(knexConfig.development);

const server = express();
middleware(server);

const port = process.env.PORT || 9000;

server.get('', (req, res) => {
    res.send(`API is running on port ${port}`)
})

server.get('/api/notes', (req, res) => {
    db('notes')
    .then(foundNotes => {
        res.json(foundNotes)
    })
    .catch(err => {
        res.json({ message: "No notes found"})
    })
})
server.get(`/api/notes/:id`, (req, res) => {
    const { id } = req.params;
    db('notes')
    .where({ id })
    .then(note => {
        res.status(200).json(note)
    })
    .catch(err => {
        res.status(500).json({message: err})
    })
})
server.post(`/api/notes`, (req, res) => {
    const note = req.body;
    db('notes')
    .insert(note)
    .then(count => {
        res.status(201).json(count)
    })
    .catch(err => {
        res.status(500).json({message: err})
    })
})
server.delete(`/api/notes/:id`, (req, res) => {
    const { id } = req.params;
    db('notes')
    .where({ id })
    .del()
    .then(count => {
        res.status(201).json(count)
    })
    .catch(err => {
        res.status(500).json({message: err})
    })
})
server.put('/api/notes/:id', (req, res) => {
    const changes = req.body;
    const { id } = req.params;
    db('notes')
    .where({ id })
    .update(changes)
    .then(count => {
        res.status(200).json(count)
    })
    .catch(err => {
        res.status(500).json({message: err})
    })
})
module.exports = server;
