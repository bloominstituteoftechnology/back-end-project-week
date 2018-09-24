const express = require('express');
const helmet = require('helmet');
const knex = require('knex');

const dbConfig = require('./knexfile');

const db = knex(dbConfig.development);

const server = express();

server.use(helmet());
server.use(express.json());

server.post('/api/notes', (req, res) => {
    const note = req.body;
    if (!note.title || !note.textBody) {
        res.status(400).json({ error: "Please provide a title and body for the note." })
    } else
        db.insert(note)
        .into('notes')
        .then(ids => {
        res.status(201).json(ids);
        })
        .catch(err => res.status(500).json({ error: "There was an error saving the note." }))
});

server.get('/api/notes', (req, res) => {
    db('notes')
    .then(notes => {
        res.status(200).json(notes)
    })
    .catch(err => res.status(500).json(err));
});

server.get('/api/notes/:id', (req, res) => {
    const {id} = req.params;
    db('notes').where({ id: id })
    .then(note => {
        if (note.length === 0) {
        res.status(404).json({ message: "The note with the specified ID does not exist." });
        } else 
        res.status(200).json(note);
    })
    .catch(err => res.status(500).json(err));
});


const port = 8000;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});