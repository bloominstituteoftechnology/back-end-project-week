const express = require('express'); // bring in express
const Note = require('../notes/notes'); // bring in our Note

const router = express.Router();

router 
.get('/', (req, res) => { // get a list of notes in db
    Note
    .find()
    .then(notes => {
        res.status(200).json(notes);
    })
    .catch(err => {
        res.status(500).json(err);
    });
})

.get('/:id', (req, res) => { // get a single id from the database
    const { id } = req.params;

    notes 
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

.post('/', (req, res) => {      // post to notes list 
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



module.exports = router;



