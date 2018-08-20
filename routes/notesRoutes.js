const express = require('express');
const server = express.Router();
const db = require('../data/db');

// endpoints go here

server.get('/', (req, res) => {
    db('notes')
        .then(note => {
            res.status(200).json(note);
        })
        .catch(err => res.status(500).json(err));
});

server.get('/:id', (req, res) => {
    const { id } = req.params;
    db('notes')
        .where({ id: Number(id) })
        .then(response => {
            res.status(200).json(response);
        })
        .catch(err => res.status(500).json(err));
});

server.post('/', (req, res) => {
    const note = req.body;
    const { title, content } = note;

    db.insert(note)
        .into('notes')
        .then(ids => {
            const id = ids[0];
            res.status(201).json({ id, ...note });
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

server.delete('/:id', (req, res) => {
    const { id } = req.params;
    db('notes')
        .where({ id: Number(id) })
        .delete()
        .then(response => {
            res.status(200).json(response);
        })
        .catch(err => res.status(500).json(err));
});

server.put('/:id', (req, res) => {
    const id = req.params.id;
    const {title, content} = req.body;
    if (!title) res.status(400).json({ err });
    else {
        db('notes')
            .where({ id: Number(id) })
            .update({title, content})
            .then(note => {
                if (note > 0) res.status(200).json(note);
                else res.status(400).json({ err });
            })
            .catch(err => res.status(500).json(err));
    }
});

 module.exports = server;