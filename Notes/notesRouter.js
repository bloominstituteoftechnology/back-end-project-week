const express = require('express');
const router = express.Router();
const Note = require('./notesModel');

//POST NOTES - Postman Test ok! http://localhost:8008/notes 
router.route('/')
.post((req, res) => {
    Note.create(req.body)
        .then(note => res.status(201).json(note))
        .catch(err => res.status(500).json({ errorMsg: 'Sorry - There Was An Error Creating Your Note' }));
})

//GET NOTES - Postman Test ok! http://localhost:8008/notes 
.get((req, res) => {
    Note.find()
        .then(notes => res.status(200).json(notes))
        .catch(err => res.status(500).json({ errorMsg: 'Sorry - There Was An Error Retrieving Your Notes' }))
})

module.exports = router;