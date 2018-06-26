const express = require('express');
const Note = require('./Note.js');
const router = express.Router();

router
    .route('/')
    .get((req, res) => {
        Note
            .find({})
            .then(response => res.status(200).json({ data: response }))
            .catch(err => res.status(500).json(err))
    })
    .post((req, res) => {
        const newNote = req.body
        if (newNote.title && newNote.content) {
            Note.create(newNote)
                .then(response => res.status(200).json({ data: response }))
                .catch(err => res.status(500).json(err))
        }
        else {
            res.status(400).json({ message: 'Please provide note title and content.' })
        }
    })

router.route('/:id')
    .delete((req, res) => {
        const deletedId = req.params.id
        Note.findByIdAndRemove({ _id: deletedId })
            .then(response => res.status(200).json({ message: "The note is deleted." }))
            .catch(err => res.status(500).json(err))
    })
    .put((req, res) => {
        const editedNote = req.body
        const editedNoteId = req.params.id
        Note.findByIdAndUpdate(editedNoteId, {
            $set: {
                title: editedNote.title,
                content: editedNote.content
            }
        })
            .then(response => res.status(200).json({ message: "The note is updated." }))
            .catch(err => res.status(500).json(err))
    })

module.exports = router;
