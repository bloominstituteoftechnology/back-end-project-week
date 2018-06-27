const router = require('express').Router();
const Note = require('./Note');

router
    .route('/')
    .get((req, res) => {
        Note
            .find({})
            .then(foundNotes => {
                res.status(200).json(foundNotes);
            })
            .catch(err => res.status(500).json({ message: err.message }));
    })
    
    .post((req, res) => {
        const newNote = req.body;
        Note
            .create(newNote)
            .then(savedNote => {
                res.status(201).json(savedNote);
            })
            .catch(err => {
                res.status(500).json({ message: err.message });
            });
    });

router
    .route('/:id')
    .get((req, res) => {
        const { id } = req.params;
        Note
            .findById(id)
            .then(foundNote => {
                res.status(200).json(foundNote);
            })
            .catch(err => {
                res.status(404).json({ message: err.message });
            });
    })

    .delete((req, res) => {
        const { id } = req.params;
        Note.findByIdAndRemove(id)
            .then(byeNote => {
                res.status(204).json(byeNote).end();
            })
            .catch(err => {
                res.status(404).json({ message: err.message });
            })
    })

    .put((req, res) => {
        const { id } = req.params;
        const update = req.body;
        const options = {
            new: true,
        };

        Note.findByIdAndUpdate(id, update, options)
            .then(updateNote => {
                res.status(200).json(updateNote);
            })
            .catch(err => {
                res.status(404).json({ message: err.message })
            })
    });

module.exports = router;