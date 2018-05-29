// Import router extention & note Model
const router = require('express').Router();
const Note = require('../models/noteModel');

router.post('/', function post(req, res) {
    const noteData = req.body;

    const note = new Note(noteData);

    note
        .save()
        .then(note => {
            res.status(201).json(note);
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

router.get('/', function get(req, res) {
    Note.find().then(notes => {
        res.status(200).json(notes);
    });
});

router.get('/:id', (req, res) => {
    res.status(200).json({ route: '/api/notes/' + req.params.id });
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;

    Note.findByIdAndRemove(id)
    .then(note => { 
        res.status(200).json(note);
    })
    .catch(err => {
        res.status(404).json(err);
    });
});

router.put('/:id', (req, res) => {
    res.status(200).json({ status: 'work on put' })
});

module.exports = router;