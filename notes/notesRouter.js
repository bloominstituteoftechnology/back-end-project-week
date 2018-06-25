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

    router
    .route('/:id')
    .get((req, res) => {
        const { id } = req.params;
        if(id.length !== 24) {
            res.status(400).json({ error: 'A note id must contain 24 characters'})
        }

        Note.findById(id)
            .then(note => {
                if(note) {
                    res.json(note)
                } else {
                    res.status(404).json({ error: `Note with id ${id} does not exist in the database`})
                }
            })
            .catch(err => {
                res.status(500).json({ error: 'Error fetching note'})
            })
    })

    .put((req, res) => {
        const { id } = req.params;
        if(id.length !== 24) {
            res.status(400).json({ error: 'A note id must contain 24 characters'})
        }

        const { title, body } = req.body;
        if(!title) {
            res.status(400).json({ error: 'Please provide a title for the note'})
        }
        if(!body) {
            res.status(400).json({ error: 'Please provide content for the note'})
        }

        Note.findByIdAndUpdate(id, { title, body }, {new: true})
            .then(note => {
                if(!note) {
                    res.status(400).json({ error: `Note with id ${id} does not exist`})
                } else {
                    res.json(note);
                }
            })
            .catch(err => {
                res.status(500).json({ error: 'The note could not be updated'})
            })
    })

    .delete((req, res) => {
        const { id } = req.params;

        Note.findByIdAndRemove(id)
            .then(deletedNote => {
                if(!deletedNote) {
                    res.status(404).json({ error: `Note with id ${id} does not exist`})
                } else {
                    res.status(204)
                }  
            })
            .catch(err => {
                res.status(500).json({ error: 'The note could be deleted'})
            })

    })
    
    






module.exports = router;