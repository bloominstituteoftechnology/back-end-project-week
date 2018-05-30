// bring in express
const express = require('express');
// bring in our Note
const Note = require('../notes/notes');

const router = express.Router();

router 
// get a list of notes in db
.get('/', (req, res) => {
    Note
    .find()
    .then(notes => {
        res.status(200).json(notes);
    })
    .catch(err => {
        res.status(500).json(err);
    });
})

// get a single id from the database
.get('/:id', (req, res) => {
    const { id } = req.params;

    Note 
    .findById(id)
    .then(note => {
        if(!note) {
            res.status(404).json({ message: 'The note with the specified ID was not found. Sorry!' });
        } else {
            res.status(200).json(note);
        }
    })
    .catch(err => {
        res.status(500).json(err);
    });
})

// post to notes list 
.post('/', (req, res) => {
    const note = new Note(req.body);
    note
    .save()
    .then(note => {
        res.status(200).json(note);
    })
    .catch(err => {
        res.status(500).json(err);
    });
})

// put to update a note
.put('/:id', (req, res) => {
    const { id } = req.params;
    const newNote = req.body;

    Note
    .findById(id)
    .then(note => {
        if(!note) {
            res.status(404).json({ message: 'The note with the specified ID was not found. Sorry!' });
        } else {
            Note
                .update(note, newNote)
                .then(updatedNote => {
                    res.status(200).json(updatedNote)
                })
                .catch(err => {
                    res.status(500).json({ message: 'The note failed to update. Sorry!' });
                });
        }
    });
    res.send(newNote);
})




module.exports = router;



