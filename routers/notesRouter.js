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

// [GET] /api/notes/:id
router.get('/:id', (req, res) => {
    const noteId = req.params.id;
    notesDb.getNote(noteId)
        .then(note => {
            if (note.length) {
                res.status(200).json(note);
            } else {
                res.status(404).json({ message: 'Note at id does not exist' });
            }
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

// [PUT] /api/notes/:id
// TO-DO ---------------------------------------------------> input handling before hits helper func
router.put('/:id', (req, res) => {
    const updates = req.body;
    const noteId = req.params.id;

    notesDb.updateNote(noteId, updates)
        .then(note => {
            if (note) {
                res.status(200).json(note);
            } else {
                res.status(404).json({ message: 'Error updating note, id does not exist' });
            }
        })
        .catch(err => {
            res.status(500).json({ message: 'Error updating note' });
        });
});

// [DELETE] /api/notes/:id
router.delete('/:id', (req, res) => {
    const noteId = req.params.id;

    notesDb.removeNote(noteId)
        .then(recordsDeleted => {
            if (recordsDeleted) {
                res.status(200).json({ message: 'Successfully deleted note' });
            } else {
                res.status(404).json({ message: 'Note at id does not exist' });
            }
        })
        .catch(err => {
            res.status(500).json({ message: 'Error deleting note' });
        });
});

module.exports = router;