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

module.exports = router;
