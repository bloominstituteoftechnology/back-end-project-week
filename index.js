const express = require('express');
const knex = require('knex');
const cors = require('cors');
const helmet = require('helmet');

const port = 7000;

const dbConfig = require('./knexfile');
const db = knex(dbConfig.development);
const server = express();

server.use(express.json());
server.use(cors());
server.use(helmet());


// ========== GET SERVER ========== //
server.get('/', (req, res) => {
    res.status(200).json('SERVER RUNNING');
});


// ========== GET NOTES ========== //
server.get('/api/notes', (req, res) => {
    console.log('getting notes...')
    db('notes')
        .then(data => {
            res.status(200).json(data);
        })
        .catch(err => {
            res.status(404).json(err);
        });
});


// ========== GET A SPECIFIC NOTE ========== //
server.get('/api/notes/:id', (req, res) => {
    db('notes')
        .where({ id: req.params.id })
        .then((data) => {
            if (data.length === 0) {
                res.status(404).json('not found');
            } else {
                res.status(200).json(data);
            }
        })
        .catch(err => {
            res.status(404).json(err);
        });
});


// ========== POST NOTE ========== //
server.post('/api/notes', (req, res) => {
    const note = req.body;

    if (note.title && note.content) {
        db('notes')
            .insert(note)
            .then(response => {
                res.status(201).json(response);
            })
            .catch(err => {
                res.status(500).json(err);
            });
    } else {
        res.status(400).json('missing parameters');
    }
});


// ========== PUT (update) NOTE ========== //
server.put('/api/notes/:id', (req, res) => {
    const edit = req.body;

    db('notes')
        .where({ id: req.params.id })
        .update(edit)
        .then(response => {
            if (response === 0) {
                res.status(404).json('Could not find note');
            } else {
                res.status(200).json(response);
            }
        })
        .catch(err => {
            res.status(500).json(err);
        });
});


// ========== DELETE NOTE ========== //
server.delete('/api/notes/:id', (req, res) => {
    const edit = req.body;

    db('notes')
        .where({ id: req.params.id })
        .delete()
        .then(response => {
            if (response === 0) {
                res.status(404).json('Could not find note');
            } else {
                res.status(200).json(response);
            }
        })
        .catch(err => {
            res.status(500).json(err);
        });
});


// ==========  SERVER PORT 7000 ========== //
server.listen(port, () => {
    console.log(`\n Server runnning on ${port} \n`);
});