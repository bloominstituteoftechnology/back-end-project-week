const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const db = require('./apiModel');

const server = express();

server.use(express.json());
server.use(helmet());
server.use(cors());

server.get('/', (req, res) => {
    res.status(200).json({ message: 'server is up' });
});

server.get('/notes', (req, res) => {
    db
        .find()
        .then(notes => {
            res.status(200).json(notes);
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

server.get('/notes/:id', (req, res) => {
    const { id } = req.params;

    db
        .findById(id)
        .then(note => {
            if (!note) {
                res.status(404).json({ error: "Could not find" });
            }
            res.status(200).json(note);
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

server.post('/notes', (req, res) => {
    const note = req.body;
    if (!note.title || !note.textBody) {
        return res.status(400).json({ error: "Please provide more information" });
    }
    db
        .create(note)
        .then(ids => {
            res.status(201).json(ids[0]);
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

server.put('/notes/:id', (req, res) => {
    const { id } = req.params;
    const changes = req.body;

    db
        .edit(id, changes)
        .then(count => {
            if (!count || count < 1) {
                res.status(404).json({ message: "Could not update" });
            } else {
                res.status(200).json(count);
            }
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

server.delete('/notes/:id', (req, res) => {
    const { id } = req.params;

    db
        .remove(id)
        .then(count => {
            if (!count || count < 1) {
                res.status(404).json({ message: "Could not remove" });
            } else {
                res.status(200).json(count);
            }
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

module.exports = server;