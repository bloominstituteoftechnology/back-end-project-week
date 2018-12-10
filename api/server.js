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

module.exports = server;