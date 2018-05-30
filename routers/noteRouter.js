// Import router extention & note Model
const router = require('express').Router();
const Note = require('../models/noteModel');

// Endpoint (1) Post Note
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

// Endpoint (2) Get All Notes
router.get('/', function get(req, res) {
    Note.find().then(notes => {
        res.status(200).json(notes);
    });
});

// Endpoint (3) Get Notes by Id
router.get('/:id', (req, res) => {
    const { id } = req.params;

    Note.findById(id)
    .then(note => {
        res.status(200).json(note);
    })
    .catch(err => {
        res.status(500).json(err);
    });
});

// Endpoint (4) Delete Notes by Id
router.delete('/:id', (req, res) => {
    const id = req.params;

    Note.findByIdAndRemove(id)
    .then(note => { 
        res.status(200).json(note);
    })
    .catch(err => {
        res.status(404).json(err);
    });
});

// Endpoint (5) Edit Notes by Id
router.put('/:id', (req, res) => {
    const { id } = req.params;

    Note.findByIdAndUpdate(id).then(note => {
        res.status(200).json(note)
    }).catch(err => {
        res.status(500).json(err);
    });
})

module.exports = router;