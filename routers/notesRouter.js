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
router.put('/:id', (req, res) => {
    const updates = req.body;
    const noteId = req.params.id;

    if (!updates.user_id && !updates.id) {
        if (updates.title !== '') {
            notesDb.updateNote(noteId, updates)
                .then(recordsUpdated => {
                    if (recordsUpdated === 1) {
                        return notesDb.getNote(noteId);
                    } else {
                        res.status(404).json({ message: 'Error updating note, id does not exist' });
                    }
                })
                .then(note => {
                    if (Array.isArray(note)) {
                        res.status(200).json(note);
                    }
                })
                .catch(err => {
                    res.status(500).json({ message: 'Error updating note'});
                });
        } else {
            res.status(400).json({ message: 'Empty title BAD!' })
        }
    } else {
        res.status(400).json({ message: 'Attempting to update constant field' });
    }
});

// [DELETE] /api/notes/:id
router.delete('/:id', (req, res) => {
    const noteId = req.params.id;

    notesDb.removeNote(noteId)
        .then(recordsDeleted => {
            if(recordsDeleted) {
                res.status(200).json({ message: 'Successfully deleted note' });
            } else {
                res.status(404).json({ message: 'Note at id does not exist'});
            }
        })
        .catch(err => {
            res.status(500).json({ message: 'Error deleting note' });
        });
});

module.exports = router;