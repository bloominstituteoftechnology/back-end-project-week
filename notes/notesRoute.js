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

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const note = await notes.findById(id);

        if (note) {
            res.status(200).json(note);
        } else {
            res.status(404).json({ message: 'Note not found' });
        }

    } catch (error) {
        res.status(500).json(error);
    }
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

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const changes = req.body;

    notes
        .update(id, changes)
        .then(count => {
            if (!count || count < 1) {
                res.status(404).json({ message: 'No note found to update' });
            } else {
                res.status(200).json(count);
            }
            
        })
        .catch(err => res.status(500).json(err));
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;

    notes
        .remove(id)
        .then(count => {
            if (!count || count < 1) {
                res.status(404).json({ message: 'Note not found to delete!' });
            } else {
                res.status(200).json(count);
            }
        })
        .catch(err => res.status(500).json(err));
});

module.exports = router;