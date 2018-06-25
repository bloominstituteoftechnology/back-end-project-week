const express = require('express');

const Note = require('./Note.js');

const router = express.Router();

router
  .route('/')
    .post((req, res) => {
        const { title, body, user } = req.body;
        if (!title || !body) {
            res.status(400).json({ errorMessage: "Please provide title, body, and user for the note." })
            return;
        }
        const newNote = new Note({ title, body, user });
        newNote.save() // filter, .select(), .where(), .sort()
        .then(result => res.status(201).json(result))
        .catch(err => res.status(500).json({ error: err.message }));
    })
    .get((req, res) => {
        Note.find()
        .then(notes => {
            res.status(200).json(notes);
        })
        .catch(err => res.status(500).json({ errorMessage: "The notes could not be retrieved." }));
    });

router
    .route('/:id')
        .get((req, res) => {
            const { id } = req.params;
            Note.findById(id)
                .then(note => res.json(note))
                .catch(err => res.status(500).json({ error: err.message }))
        })
        .delete((req, res) => {
            const { id } = req.params;
            Note.findByIdAndRemove(id)
                .then(note => res.json(note))
                .catch(err => res.status(500).json({ error: err.message }))
        })
        .put((req, res) => {
            const { id } = req.params;
            const { body } = req.body;
            Note.findByIdAndUpdate(id, body)
                .then(note => res.json(note))
                .catch(err => res.status(500).json({ error: err.message }))
        });

module.exports = router;