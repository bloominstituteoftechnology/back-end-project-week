const express = require('express');
const server = express();
const db = require('./notedb.js')
const cors = require('cors');

server.use(express.json())
server.use(cors());

server.get('/api/notes', (req,res) => {
    db.getNotes()
    .then(notes => {
        res.status(200).json(notes);
    })
    .catch(err => {
        res.status(500).json(err);
    })
})

server.post('/api/notes', async (req, res) => {
    const note = await req.body;
    db.createNote(note)
    .then(id => {
        res.status(201).json(id);
    })
    .catch(err => {
        res.status(500).json(err);
    })
})

server.get('/api/notes/:id', (req,res) => {
    const id = req.params.id;
    db.viewNote(id)
    .then(note => {
        res.status(200).json(note);
    })
    .catch(err => {
        res.status(404).json(err);
    })
})

server.put('/api/notes/:id', (req, res)  => {
    const id = req.params.id;
    const content = req.body;
    db.editNote(content, id)
    .then(num => {
        res.status(200).json(num);
    })
    .catch(err => {
        res.status(400).json(err);
    })
})

server.delete('/api/notes/:id', (req, res) => {
    const id = req.params.id;
    db.deleteNote(id)
    .then(num => {
        res.status(200).json(num);
    })
    .catch(err => {
        res.status(404).json(err);
    })
})

module.exports = server;