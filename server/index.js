const session = require('express-session');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const express = require('express');
const cors = require('cors');

const server = express();
const db = require('./data/db');

server.use(express.json());
server.use(cors());

const PORT = 5000

server.get('/notes', (req, res) => {
    db('notes')
   
    .then(notes => {
        res.json(notes);
    })
    .catch(err => res.send(err));

})

server.post('/addnote', function(req, res) {
    const note = req.body;

    db('notes')
    .insert(note)
    .then(function(ids) {
        db('notes')
        .where({id: ids[0]})
        .first()
        .then(note => {
            res.send(`New note added, ${note.title}!`)
        });
    })
    .catch(function(error) {
        res.status(500).json({ error});
    })
})





server.listen(PORT, () => {
    console.log(`Server up and running on ${PORT} m8`)
})