const express = require('express');
const server = express();
const notesDb = require('../data/notesModel');

// bringing in the relevant middleware
const configureMiddleware = require('../config/middleware');
configureMiddleware(server);

// API Status at base URL
server.get('/', (req, res) => res.send({API: "live"}));

// GET all notes
server.get('/note/get/all', async (req, res) => {
    try {
        const notes = await notesDb.getAll();
        res.status(200).json(notes)
    } catch (err) {
        res.status(500).json(err);
    }
})

module.exports = server;