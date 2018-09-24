const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const db = require('./db/dbconfig.js');

const server = express();

server.use(express.json());
server.use(cors());

server.get('/', (req,res) => {
    res.send('Ready for launch.');
});

server.post('/api/notes', (req, res) => {
    const note = req.body;

    if(!note.title || !note.body){
        res.status(400).json({ errorMsg: 'Please enter information for title and body.'})
    }
    db('notes')
    .insert(note)
    .then(ids => {
        res.status(201).json(ids);
    })
    .catch(err => res.status(500).json({ errorMsg: 'Unable to add note to notes.'}))
})

server.get('/api/notes', (req, res) => {
    db('notes')
    .select('title', 'body')
    .then(notes => {
        res.status(200).json(notes)
    })
    .catch(err => res.status(500).json({ errorMsg: 'Unable to retrieve notes.'}));
})

const port = process.env.PORT || 3300;
server.listen(port, () => {
    console.log(`\n=== Server listening on port ${port}\n`);
});