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


server.listen(port, () => console.log('\n==== API is running ====\n'));