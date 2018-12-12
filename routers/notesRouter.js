const express = require('express');

const notesDb = require('../data/helpers/notesHelper.js');

const protected = require('../middleware/protected.js');

const router = express.Router();

const knex = require('knex');

// [GET] /api/notes
// get all notes in table
router.get('', protected, (req, res) => {
    notesDb.getNotes()
        .then(notes => {
            if (notes.length) {
                res.status(200).json(notes);
            } else {
                res.status(200).json({ code: 1, message: 'No notes in database' });
            }
        })
        .catch(err => {
            res.status(500).json({ code: 3, message: 'Error retrieving notes' });
        });
});

// [GET] /api/notes/:id
// get note by note id
router.get('/:id', protected, (req, res) => {
    const noteId = req.params.id;
    notesDb.getNote(noteId)
        .then(note => {
            if (note.length) {
                res.status(200).json(note);
            } else {
                res.status(404).json({ code: 2, message: 'Note id does not exist' });
            }
        })
        .catch(err => {
            res.status(500).json({ code: 3, message: 'Error retrieving note' });
        });
});

// [PUT] /api/notes/:id
router.put('/:id', protected, async (req, res) => {
    const updates = req.body;
    const noteId = req.params.id;
    let valid = true;
    const validUpdates = {};

    // validate post request format
    Object.getOwnPropertyNames(updates).forEach(key => {
        switch (key) {
            case 'title':
                if (typeof updates[key] !== 'string' || updates[key] === '') {
                    valid = false;
                } else {
                    validUpdates.title = updates.title;
                }
                break;
            case 'textBody':
                if (typeof updates[key] !== 'string') {
                    valid = false;
                } else {
                    validUpdates.textBody = updates.textBody;
                }
                break;
            case 'tags':
                if (!Array.isArray(updates[key])) {
                    valid = false;
                    break;
                } else {
                    if (!updates[key].every(element => typeof element === 'string' || typeof element === 'number')) {
                        valid = false;
                        break;
                    };
                    updates.tags = updates.tags.join(',');
                    validUpdates.tags = updates.tags;
                    break;
                }
            default:
                break;
        }
    });
    try {
        if (valid) {
            const currentNote = await notesDb.getNote(noteId);
            if (currentNote.length) {
                const finalized = Object.assign({}, currentNote[0], validUpdates);
                if(!isEquivalent(currentNote[0], finalized)) {
                    finalized.updated_at = knex.fn.now();

                    const recordsUpdated = await notesDb.updateNote(noteId, finalized);
                    if(recordsUpdated) {
                        res.status(200).json({ code: 6, message: 'Successfully updated note' });
                    }
                } else {
                    res.status(200).json({ code: 7, message: 'No changes detected, note unchanged' });
                }
            } else {
                res.status(404).json({ code: 2, message: 'Note id does not exist' });
            }
        } else {
            res.status(400).json({ code: 5, message: 'Request formatted incorrectly' });
        }
    } catch(error) {
        res.status(500).json({ code: 3, message: 'Error updating note'});
    }
});

// [DELETE] /api/notes/:id
router.delete('/:id', protected, (req, res) => {
    const noteId = req.params.id;

    notesDb.removeNote(noteId)
        .then(recordsDeleted => {
            if (recordsDeleted) {
                res.status(200).json({ code: 8, message: 'Successfully deleted note' });
            } else {
                res.status(404).json({ code: 2, message: 'Note at id does not exist' });
            }
        })
        .catch(err => {
            res.status(500).json({ code: 3, message: 'Error deleting note' });
        });
});

// helper function used in put request
// returns if two objects are equivalent
function isEquivalent(a, b) {
    var aProps = Object.getOwnPropertyNames(a);
    var bProps = Object.getOwnPropertyNames(b);

    if (aProps.length != bProps.length) {
        return false;
    }

    for (var i = 0; i < aProps.length; i++) {
        var propName = aProps[i];

        if (a[propName] !== b[propName]) {
            return false;
        }
    }

    return true;
};

module.exports = router;