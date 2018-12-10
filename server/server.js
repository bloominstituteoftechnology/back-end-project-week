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
        res.status(500).json(err)
    })
})

module.exports = server;