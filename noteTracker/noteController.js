const express = require('express');
const router = express.Router();

const Note = require('./note');

router
.route('/')
.get((req, res) => {
    Note.find()
    .select('title')
    .then(note => 
        res.json(note))
    .catch(err => res.status(500).json({ error: 'The category information could not be retrieved.' }));
})
.post((req, res) => {
    const { title, body } = req.body;
    const newNote = new Note({ title, body });
newNote
    .save()
    .then(savedNote => {
        res.status(201).json({savedNote});
    })
    .catch(err => {
        res.status(500).json({ error: err });
    });
});

module.exports = router;