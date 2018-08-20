const express = require('express');
const server = express();
const db = require('./data/db.js');

const port = 8000;

server.use(express.json());


server.get('/notes', (req, res) => {
    db('notes')
        .then(notes => {
            res.status(200).json(notes)
        })
        .catch(err => res.status(500).json(err))
})

server.post('/new-note', (req, res) => {
    const note = req.body;
    db('notes')
        .insert(note)
        .then(ids => {
            db('notes')
                .where({ id: ids[0] })
                .first()
                .then( note => {
                    res.status(201).json(note)
                })
        })
        .catch( err =>  res.status(500).json(err))
})


server.listen(port, () => console.log('\n==== API is running ====\n'));