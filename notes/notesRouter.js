const express = require('express');
const router = express.Router();
const Note = require('./Note');

router
    .route('/')

    .get((req, res) => {
        Note.find()
            .then(notes => {
                res.json(notes);
            })
            .catch(err => {
                res.status(500).json({ error: 'Error fetching notes'})
            })
    })

    .post((req, res) => {
        const { title, body } = req.body;
        const newNote = new Note({title, body})

        if(!title) {
            res.status(400).json({ error: 'Please provide a title for the note'})
        }
        if(!body) {
            res.status(400).json({ error: 'Please provide content for the note'})
        }

        newNote.save()
            .then(newNote => {
                res.status(201).json(newNote)
            })
            .catch(err => {
                res.status(500).json({ error: 'Error saving note to the database'})
            });
    });






module.exports = router;