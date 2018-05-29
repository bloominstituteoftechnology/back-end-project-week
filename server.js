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

server.get('/', (req, res) => {
    res.send({ Message: 'api running' })
})

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

server.listen(port, () => console.log(`Server running on port: ${port}`))