const express = require('express');

const db = require('./data/db')

const server = express();
server.use(express.json());

server.get('/', (req, res) => {
    res.send('up and running... LambdaNotes')
});

server.get('/notes', (req, res) => {
    db('notes').then(note => {
        res.status(200).json(note)
    }).catch(err => res.status(500).json(err))
});

server.post('/notes', (req, res) => {
    const note = req.body;

    db.insert(note).into('notes').then(notes =>{
        const id = notes[0];
        res.status(201).json({id, ...note})
    }).catch(err => res.status(500).json(err))
})

const port = 6500;
server.listen(port, function () {
    console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});