const router = require('express').Router();
const Note = require('../model/Note.js');

router.route('/')
    .get((req, res) => {
        Note.find()
            .then(response => res.json(response))
            .catch(err => res.status(500).json({ error: err.message }));
    });

router.route('/:id')
    .get((req, res) => {
        const { id } = req.params;
        Note.findById(id)
            .then(response => res.json(response))
            .catch(err => res.status(500).json({ error: err.message }));
    })
    .post((req, res) => {
        const newNote = ({ title, body } = req.body);
        Note.create(newNote)
            .then(response => res.status(201).json(response))
            .catch(err => res.status(500).json({ error: err.message }));
    })
    .put((req, res) => {
        const updatedNote = ({ title, body } = req.body);
        const { id } = req.params;
        Note.findByIdAndUpdate(id, updatedNote)
            .then(response => res.status(202).json(response))
            .catch(err => res.status(500).json({ error: err.message }));
    })
    .delete((req, res) => {
        const { id } = req.params;
        Note.findByIdAndRemove(id)
            .then(response => res.json(response))
            .catch(err => res.status(500).json({ error: err.message }));
    });


module.exports = router;