const express = require('express');
const server = express();
const db = require('./notesDb.js')

server.use(express.json())

server.get('/api/notes', (req,res) => {
    db.getNotes()
    .then(notes => {
        res.status(200).json(notes);
    })
    .catch(err => {
        res.status(500).json(err);
    })
})

server.post('/api/notes/create', async (req, res) => {
    const note = await req.body;
    db.createNote(note)
    .then(id => {
        res.status(201).json(id);
    })
    .catch(err => {
        res.status(500).json(err);
    })
})

module.exports = server;