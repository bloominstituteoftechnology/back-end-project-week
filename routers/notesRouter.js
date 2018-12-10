const express = require('express');

const db = require('../data/dbConfig.js');

const router = express.Router();

router.post('/', (req, res) => {
    const newNote = req.body;
    db('notes')
    .insert(newNote)
    .then(() => {
        res.status(201).json(req.body);
    })
    .catch(err => {
        res.status(500).json({ message: 'could not create note', err });
    });
});

router.get('/', (req, res) => {
    db('notes')
    .then(notes => {
        res.status(200).json(notes);
    })
    .catch(err => {
        res.status(500).json({ message: 'could not get notes', err });
    });
})

module.exports = router;