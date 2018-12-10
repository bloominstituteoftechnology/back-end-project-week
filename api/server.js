const express = require('express');
const server = express();

const db = require('../data/dbConfig');

server.use(express.json());

server.get('/', async (req, res) => {
    const notes = await db('notes');
    res.status(200).json(notes);
})

server.get('/')

module.exports = server;