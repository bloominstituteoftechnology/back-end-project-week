const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const Note = require('./notes/Note');

const server = express();

const mongoDB = `mongodb://localhost/lambdanotes`;
const port = process.env.PORT || 3000;

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

// // Initial GET
// server.get('/', (req, res) => {
//     res.send({ Message: 'api running' })
// })

// POST notes
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

// GET notes
server.get('/api/notes', (req, res) => {

    Note
    .find()
    .then(notes => {
        res.status(200).json({ notes })
    })
    .catch(err => {
        res.status(500).json({ Error: 'Notes not found'})
    })
})

server.listen(port, () => console.log(`Server running on port: ${port}`))