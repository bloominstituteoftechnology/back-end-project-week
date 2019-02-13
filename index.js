const express = require('express');
const knex = require('knex');
const dbConfig = require('./knexfile.js');
const db = knex(dbConfig.development);

const server = express();

server.use(express.json());

const PORT = 2200;

server.post('/api/notes', (req, res) => {
    const newNote = req.body;

    if (newNote.title && newNote.body) {
        db('notes').insert(newNote)
            .then(noteId => {
                res.status(200).json(noteId);
            })
            .catch(err => {
                res.status(500).json({ message: 'Failure to create note' });
            })
    } else {
        res.status(400).json({ message: 'Missing title or body' });
    };
});

server.get('/api/notes', (req, res) => {
    db('notes')
        .then(notes => {
            res.status(200).json(notes);
        })
        .catch(err => {
            res.status(500).json({ message: 'Failure to load notes' });
        });
});

server.get('/api/notes/:id', (req, res) => {
    const { id } = req.params;
    console.log(req.params);
    db('notes').where('id', id)
        .then(note => {
            res.status(200).json(note);
        })
        .catch(err => {
            res.status(500).json({ message: 'Failed to get note' })
        })
});

server.put('/api/notes/:id', (req, res) => {

});

server.delete('/api/notes/:id', (req, res) => {

});

server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
});