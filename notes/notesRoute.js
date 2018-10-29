const express = require('express');

const notes = require('./notesModel.js');

const router = express.Router();

router.get('/', (req, res) => {
    notes
        .find()
        .then(notes => {
            res.status(200).json(notes);
        })
        .catch(err => res.status(500).json(err));
});

router.post('/', (req, res) => {
    const note = req.body;

    notes
        .add(note)
        .then(ids => {
            res.status(201).json(ids[0]);
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

module.exports = router;