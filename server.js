const express = require('express');
const knex = require('knex');
const knexConfig = require('./knexfile.js');
const db = knex(knexConfig.development);
const cors = require('cors');

const server = express();
server.use(express.json());

// server test
server.get('/', (req, res) => {
    res.send({ API: 'is live' });
});

// display list of notes
server.get('/api/notes/all', (req, res) => {
    db('notes')
        .then(notes => {
            res.status(200).json(notes);
        })
        .catch(error => {
            res.status(500).json({ message: 'Could not retrieve notes.', error });
        });
});

// create note with title and content
server.post('/api/notes', (req, res) => {
    const { title, body } = req.body;
    if (!title || !body) {
        res.status(422).json({ message: 'Provide title and body.' });
    } else {
        db('notes')
            .insert(req.body)
            .then(ids => {
                res.status(201).json(ids);
            })
            .catch(error => {
                res.status(500).json({ message: 'Error adding note.', error });
            });
    };
});

// view an existing note
server.get('/api/notes/:id', (req, res) => {
    const { id } = req.params;
    db('notes')
        .where({ id })
        .then(note => {
            if (!note) {
                res.status(404).json({ message: 'Note with specified ID does not exist.' });
            } else {
                res.status(200).json(note);
            }
        })
        .catch(error => {
            res.status(500).json({ message: 'Note could not be retrieved.', error });
        });
});

// edit an existing note
server.put('/api/notes/:id', (req, res) => {
    const { id } = req.params;
    const { title, body} = req.body;
    if (!title || !body) {
        res.status(422).json({ message: 'Provide title and body.' });
    } else {
        db('notes')
            .where({ id })
            .update(req.body)
            .then(note => {
                if (note) {
                    res.status(200).json(note);
                } else {
                    res.status(404).json({ message: 'Note with specified ID does not exist.' });
                };
            })
            .catch(error => {
                res.status(500).json({ message: 'Could not edit note.', error });
            });
    };
});

module.exports = server;