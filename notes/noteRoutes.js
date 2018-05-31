const express = require('express');
const router = express.Router();
const Note = require('./Note');

// POST notes - Title + Body/Content
router.post('/notes', (req, res) => {

    Note
    .create(req.body)
    .then(note => {
        res.status(201).json({ note })
    })
    .catch(err => {
        res.status(500).json({ Err: 'error creating note' })
    })
})

// GET notes - Display Notes
router.get('/notes', (req, res) => {

    Note
    .find().select('title body id userId').populate('userId', 'username -_id')
    .then(notes => {
        res.status(200).json({ notes })
    })
    .catch(err => {
        res.status(500).json({ Error: 'Notes not found'})
    })
})

// GET notes - Display a specific note
router.get('/note/:id', (req, res) => {
    const id = req.params.id;

    Note
    .findById(id).select('title body')
    .then(note => {
        res.status(200).json({ note })
    })
    .catch(err => {
        res.status(404).json({ Error: 'Cannot fulfill request '})
    })
})

// PUT /note - Edits a note
router.put('/note/:id', (req, res) => {
    const id = req.params.id;
    const note = req.body;

    Note
    .findByIdAndUpdate(id, note)
    .then(response => {
        res.status(200).json({ note })
    })
    .catch(err => {
        res.status(500).json({ err: "Cannot edit"})
    })
})

// DELETE /note
router.delete('/note/:id', (req, res) => {
    const id = req.params.id;
    
    Note
    .findByIdAndRemove(id)
    .then(note => {
        res.status(200).send('Note deleted successfully');
    })
    .catch(err => {
        res.status(500).json({ Error: "Cannot delete "})
    })
})

module.exports = router;