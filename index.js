const express = require('express');
const helmet = require('helmet');
const knex = require('knex');
const cors = require('cors');

const dbConfig = require('./knexfile');

const db = knex(dbConfig.development);

const server = express();

server.use(express.json());
server.use(helmet());
server.use(cors());

server.get('/', (req, res) => {
    res.send('API needs a break');
});


// add a note
server.post('/api/notes', (req, res) => {
    const newNote = req.body;
    const { title, text } = req.body;
    if (!title || !text) {
        res.status(400).json({ errorMessage: 'A note title and text are required' });
        return;
    }
    db.insert(newNote)
        .into('notes')
        .then(ids => {
            res.status(201).json(ids);
        })
        .catch(err => res.status(500).json(err));
});

// get the list of notes
server.get('/api/notes', (req, res) => {
    db('notes')
        .then(notes => {
            res.status(200).json(notes);
        })
        .catch(err => res.status(500).json(err));
});

// get a specific note
server.get('/api/notes/:id', (req, res) => {
    const {id} = req.params;
    db('notes')
        .where({id: id}).first()
        .then(note => {
            // console.log(note.length);
            if(!note) {
                res.status(401).json({ message: 'The note with specified ID does not exist' });
                return;
            } else res.status(200).json(note);
        })
        .catch(err => res.status(500).json(err));
});

// edit a note
server.put('/api/notes/:id', (req, res) => {
    const changes = req.body;
    const {id} = req.params;

    db('notes')
        .where({id: id}).first()
        .update(changes)
        .then(count => res.status(200).json(count))
        .catch(err => res.status(500).json(err));
});

// delete a note
server.delete('/api/notes/:id', (req, res) => {
    const {id} = req.params;

    db('notes')
        .where({id})
        .del()
        .then(count => {
            if (count === 0) {
                res.status(404).json({ message: 'Cannot delete note that does not exist.' });
                return;
            }
            res.status(200).json(count)
        })
        .catch(err => res.status(500).json(err));
});

const port = 8000;
server.listen(port, function() {
    console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});