const express = require('express');
const cors = require('cors');

const db = require('./data/dbConfig.js');

const server = express();

server.use(express.json());
server.use(cors());

server.get('/api/notes', (req, res) => {
    db('notes')
        .then(notes => {
            res.status(200).json(notes);
        })
        .catch(err => {
            res.status(500).json({ error: 'There was an error fetching the notes.', err });
        });
});

server.post('/api/notes', (req, res) => {
    const newNote = req.body;

    if (!newNote.title) {
        res.status(500).json({ message: 'The title field is required.' });
    } else {
        db('notes')
        .insert(newNote)
        .then(ids => {
            res.status(201).json(ids[0]);
        })
        .catch(err => {
            res.status(500).json({ error: 'There was an error adding the new note.', err });
        });
    }
});

server.listen(3500, () => console.log('\n\nServer is running on port 3500\n\n'));