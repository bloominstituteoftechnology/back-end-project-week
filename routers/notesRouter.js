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

module.exports = router;