const express = require('express');

const notesDb = require('../data/helpers/notesHelper.js');

const router = express.Router();

// [GET] /api/notes
router.get('', (req, res) => {
    notesDb.getNotes()
        .then(notes => {
            res.status(200).json(notes);
        })
        .catch(err => {
            res.status(500).json({ message: 'Error retrieving notes' });
        });
});

// [POST] /api/notes/:id
router.post('/:id', (req, res) => {
    const user_id = req.params.id;
    const newNote = req.body;

    notesDb.addNote(newNote, user_id)
        .then(id => {
            res.status(201).json(id);
        })
        .catch(err => {
            if (err.errno === 1 && err.code === 'SQLITE_ERROR') {
                res.status(404).json({ message: 'User not found' });
            } else {
                res.status(500).json(err);
            }
        });
});

module.exports = router;