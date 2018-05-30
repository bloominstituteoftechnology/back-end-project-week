const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();


const Note = require('./notes/Note');

const server = express();

const mongoDB = `mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@ds139920.mlab.com:39920/lambdanotes`;
const port = process.env.PORT || 3001;

// Connect to mongo
mongoose
    .connect(mongoDB)
    .then(connect => {
        console.log('Connected!');
    })
    .catch(err => {
        console.log('Not connected');
})

// middleware
server.use(express.json());
server.use(cors());

// Initial GET
server.get('/', (req, res) => {
    res.send({ Message: 'api running' })
})

// POST notes - Title + Body/Content
server.post('/api/notes', (req, res) => {

    Note
    .create(req.body)
    .then(note => {
        res.status(201).json({ note })
    })
    .catch(err => {
        res.status(500).json({ Err: 'error creating note' })
    })
})

// GET notes - Display Notes
server.get('/api/notes', (req, res) => {

    Note
    .find().select('title body id')
    .then(notes => {
        res.status(200).json({ notes })
    })
    .catch(err => {
        res.status(500).json({ Error: 'Notes not found'})
    })
})

// GET notes - Display a specific note
server.get('/api/note/:id', (req, res) => {
    const id = req.params.id;

    Note
    .findById(id).select('title body')
    .then(note => {
        res.status(200).json({ note })
    })
    .catch(err => {
        res.status(404).json({ Error: 'Cannot fulfill request '})
    })
})

// PUT /api/note - Edits a note
server.put('/api/note/:id', (req, res) => {
    const id = req.params.id;
    const note = req.body;

    Note
    .findByIdAndUpdate(id, note)
    .then(response => {
        res.status(200).json({ note })
    })
    .catch(err => {
        res.status(500).json({ err: "Cannot edit"})
    })
})

// DELETE /api/note
server.delete('/api/note/:id', (req, res) => {
    const id = req.params.id;
    
    Note
    .findByIdAndRemove(id)
    .then(note => {
        res.status(200).send('Note deleted successfully');
    })
    .catch(err => {
        res.status(500).json({ Error: "Cannot delete "})
    })
})

server.listen(port, () => console.log(`Server running on port: ${port}`))