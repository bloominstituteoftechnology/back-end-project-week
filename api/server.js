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

//POST a new note with a title and body

server.post('/api/notes', (req, res) => {
    const body = req.body;
    db('notes')
    .insert(body)
    .then(ids => {
        res.status(201).json(ids);
    })
    .catch(error => res.status(500).json({
        message: 'Error posting new note'
    }))
})

//PUT - edit an existing note

server.put('/api/notes/:id', (req, res) => {
    const changes = req.body;
    const { id } = req.params;
    db('notes')
    .where({ id: id })
    .update(changes)
    .then(count => {
        res.status(200).json({ count })
    })
    .catch(error => res.status(500).json({ message: 'Failed to edit note' }))
})


module.exports = server;