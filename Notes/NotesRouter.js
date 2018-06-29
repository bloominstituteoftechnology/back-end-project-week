const express = require('express');
const router = express.Router();
const Note = require('./NotesModel.js');

router 
    .route('/api/notes')
    .get((req, res) => {
        console.log('Here')
        Note.find()
            .then(notes => {
                res.status(200).json(notes); 
            })
            .catch(error => res.status(500).json({ error: 'Error fetching Notes. '}));
    })
    .post((req, res) => {
        const { title, text } = req.body;
        const newNote = new Note ({ title, text }); 
        if (!title || !text) {
            res.status(400).json({ error: 'Please enter title and text.' });
            return; 
        }
        newNote
            .save()
            .then(savedNote => {
                res.status(201).json({ savedNote });
            })
            .catch(error => {
                res.status(500).json({ error: error.message }); 
            });
    });

router
    .route('/api/notes/:id')
    .get((req, res) => {
        const { id } = req.params;
        Note
            .findById(id)
            .then(response => {
                res.status(200).json(response);
            })
            .catch(error => {
                res.status(404).json({ error: 'The note with that ID does not exist.'})
            }); 
    })
    .delete((req, res) => {
        const { id } = req.params; 
        Note
            .findByIdAndRemove(id)
            .then(response => {
                if (response == 0) {
                    res.status(404).json({ error: 'The note with that ID does not exist.' })
                    return; 
                }
                res.json('Note was successfully removed!');
            })
            .catch(error => {
                res.status(500).json({ error: 'Error removing note.' }); 
            }); 
    })
    .put((req, res) => {
        const { id } = req.params;
        const { title, text } = req.body;
        const updatedNote = { title, text };
        if (!title || !text) {
            res.status(400).json({ error: 'Please enter title and text.' });
            return; 
        }
        Note
            .findByIdAndUpdate(id, updatedNote)
            .then(response => {
                res.json(response); 
            })
            .catch(error => {
                res.status(500).json({ error: 'Note cannot be modified.' })
            });
    });

module.exports = router; 