const express = require('express');
const server = express();
server.use(express.json()); 

const knex = require('knex'); 
const dbConfig = require("./knexfile");
const db = knex(dbConfig.development);

const cors = require('cors'); 
server.use(cors()); 

server.get('/', (req, res) => {
    res.send('We are a go Mr. Snowblow!'); 
})


//===============ENDPOINTS==============//

server.get('/notes', (req, res) => {
    db('notes')
        .then(notes => {
            res.status(201).json({notes});
        })
        .catch(err => {
            res.status(500).json({err: "Failed to get notes from notes table."})
        })
})

server.post('/notes', (req, res) => {
    const note = req.body; 

    db.insert(note).into('notes')
        .then(notes => {
            res.status(201).json({notes});
        })
        .catch(err => {
            res.status(500).json({err: "Failed to add notes to notes table."})
        })
})

server.put('/notes/:id', (req, res) => {
    const [id, body] = [req.params.id, req.body];

    db('notes')
        .where('id', id)
        .update({
            'title': body.title,
            'note': body.note, 
        })
        .then(notes => {
            res.status(201).json({notes});
        })
        .catch(err => {
            res.status(500).json({err: "Failed to modify note in notes table."})
        })
})

module.exports = server;