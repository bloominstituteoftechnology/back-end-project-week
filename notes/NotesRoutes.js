const express = require('express');
const Notes = require('./Notes');
const router = express.Router();


let ObjectID = require('mongodb').ObjectID;



router.post('/', (req, res) => {
    const { title, content, notesAuthor } = req.body;
    if (!title || !content || !notesAuthor) {
        res.status(400).json({ message: 'Missing fields for Note', error: error });
    } else {
        Notes.create({ title, content, notesAuthor })
        .then(note => {
            res.status(201).json(note);
        })
        .catch(err => {
            res.status(500).json({ message: 'Error saving to database'});
        })
    }
});

//View a note
router.get('/',(req, res) => {
    const id = req.params.id;
    Notes.find()
        .then(note => { 
            res.status(200).json(note);
        })
        .catch(err => res.status(500).json(err)); 
});

//list notes
router.get('/:id', (req, res) => {
    const { id } = req.params;
    Notes.findById(id).select('-__v -_id -notesAuthor')
        .then(note => {
            if (note !== null) {
                res.status(200).json({ note })
            } else {
                res.status(404).json({ message: 'Note no longer available' })
            }
           
        })
        .catch(err => res.status(500).json(err));
});




//remove a note
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    if (!id) {
        res.status(422).json({ message: 'NEED an ID' });
    } else {
        Notes.findByIdAndRemove(id)
            .then(note => {
                if (note) {
                    res.status(204).end();
                } else {
                    res.status(404).json({ message: 'Note not found' });
                }
            })
            .catch(err => res.status(500).json(err));
    }
});




//Edit a note
router.put('/:id',(req, res) => {
    const { id } = req.params;
    const { title, content, notesAuthor } = req.body;
    Notes.findByIdAndUpdate(id, { title, content, notesAuthor }).select('-__v -_id -notesAuthor')
        .then(note => { 
            if (note) {
                res.status(200).json(note);
            } else {
                res.status(404).json({ message: 'Note not found' });
            }
        })
        .catch(err => res.status(500).json(err));
    }) 
        

module.exports = router;