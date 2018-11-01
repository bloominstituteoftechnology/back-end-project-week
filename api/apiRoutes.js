const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const db = require('./apiModel');

const server = express();

server.use(express.json());
server.use(helmet());
server.use(cors());

server.get('/notes/get/all', (req, res) => {
    db
        .find()
        .then(notes => {
            res.status(200).json(notes)
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

server.get('/notes/get/:id', (req, res) => {
    const { id } = req.params;

    db
        .findById(id)
        .then(note => {
            res.status(200).json(note);
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

server.post('/notes/create', (req, res) => {
    const note = req.body;
    if (!note.title || !note.textBody) {
        res.status(400).json({ error: "Please provide more information" });
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

server.put('/notes/edit/:id', (req, res) => {
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

server.delete('/notes/remove/:id', (req, res) => {
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