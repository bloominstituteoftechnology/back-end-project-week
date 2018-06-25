const express = require('express');
const router = require('router');
const Note = require('./NotesModel.js');

router 
    .route('/')
    .get((req, res) => {
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
            res.status(400).json({ error: 'Please enter title and text. '});
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

    module.exports = router; 