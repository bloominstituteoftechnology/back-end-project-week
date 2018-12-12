const express = require('express');

const db = require('../data/dbConfig.js');

const protected = require('../authFunctions/protected.js');

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

router.get('/', protected, (req, res) => {
    db('notes')
    .then(notes => {
        res.status(200).json(notes);
    })
    .catch(err => {
        res.status(500).json({ message: 'could not get notes', err });
    });
});

router.get('/:id', protected, (req, res) => {
    db('notes')
    .where({ 'notes.id': req.params.id })
    .first()
    .then(ids => {
        res.status(200).json(ids);
    })
    .catch(err => {
        res.status(500).json({ message: 'could not get notes', err });
    });
});

router.put('/:id', (req, res) => {
    const changes = req.body;
    const { id } = req.params;

    db('notes')
    .where({ id })
    .update(changes)
    .then(count => {
        res.status(200).json({ count });
    })
    .catch(err => {
        res.status(500).json({ message: 'could not update note', err });
    });
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;

    db('notes')
    .where({ id })
    .del()
    .then(count => {
        res.status(200).json({ count });
    })
    .catch(err => {
        res.status(500).json({ message: 'could not delete note', err });
    });
});



module.exports = router;