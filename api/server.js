const express = require('express');
const server = express();

const db = require('../data/dbConfig');

server.use(express.json());

server.get('/', async (req, res) => {
    res.status(200).json({ message: 'server is woke!' });
})

server.get('/api/notes', async (req, res) => {
    const notes = await db('notes');
    res.status(200).json(notes);
})

server.get('/api/notes/:id', async (req, res) => {
    const id = req.params.id;
    const note = await db('notes').where({ id: id})
    res.status(200).json(note);
})

module.exports = server;