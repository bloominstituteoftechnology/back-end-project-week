const notesDB = require('../../notes/notesModel.js');
const express = require('express');
const router = express.Router();

router.get('/', async(req, res) => {
    await notesDB.get()
        .then(notes => {
            res.status(200).json(notes);
        })
        .catch(err => {
            res.status(500).json({ errorMessage: 'Failed to find notes.' });
        });
});

router.get('/:id', async(req, res) => {
    const { id } = req.params;
    await notesDB.get(id)
    .then(note => {
            res.status(200).json(note)
        })
        .catch(err => {
            res.status(500).json({ errorMessage: 'This individual note could not be found.' });
        });
});

router.post('/', async(req, res) => {
    const note = req.body;
    notesDB.insert(note).then(ids => {
        res.status(201).json(ids)
    })
    .catch(err => {
        res.status(500).json({ errorMessage: 'Failed to insert note. Please make sure you have a title and content.' });
    });
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const note = req.body;
    await notesDB.update(id, note)
        .then(note => {
            res.json(note)
        })
        .catch(err => {
            res.status(500).json({ errorMessage: 'Failed to update Note.' });
        });
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    await notesDB.remove(id)
        .then(note => {
            res.json(note);
        })
        .catch(err => {
            res.status(500).json({ errorMessage: 'Failed to delete Note.' });
        });
});

module.exports = router;