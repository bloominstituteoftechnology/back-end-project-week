const router = require('express').Router();

const Note = require('./noteModel');

router
    .route('/')

    .get((req, res) => {
        Note.find({})
            .then(notes => {
                res.status(200).json(notes);
            })
            .catch(err => {
                res.status(500).json({
                    errorMessage: 'The notes could not be retrieved.'
                });
            })
    .post((req, res) => {
        const note = new Note(req.body);
        const { title, content } = req.body;

        if (!title || !content) {
            res.status(400).json({ errorMessage: 'Please provide a title and content for the note.' });
        }

        note
            .save()
            .then(savedNote => {
                res.status(201).json(savedNote);
            })
            .catch(err => res.status(500).json(err));
    });
    });

    router
        .route('/:id')
        .get((req, res) => {
            Note.findById(req.params.id)
                .then(note => {
                    if (note === null) {
                        res.status(404).json({
                            errorMessage: 'The note with specified ID does not exist.'
                        });
                    }
                    res.status(200).json(note);
                })
                .catch(err => {
                    res.status(500).json({ errorMessage: 'The note could not be retrieved.' });
                });
        })
        .delete((req, res) => {
            const {id} = req.params;
            Note.findByIdAndRemove(id)
                .then(note => {
                    if (note === null) {
                        res.status(404).json({ message: 'not found' });
                    }else {
                        res.status(200).json(note);
                    }
                })
                .catch(err => {
                    res.status(500).json({ errorMessage: 'The note could not be removed.' });
                    });
                })
        .put((req, res) => {
            const { id } = req.params;
            const update = req.body;
            const { title, content } = update;

            Note.findByIdAndUpdate(id, update)
            .then(note => {
                if (note === null) {
                    res.status(404).json({ message: 'The note with the specified ID does not exist.' });
                }else if (!title || !content) {
                    res.status(400).json({ errorMessage: 'Please provide a title and content for the note.' });
                });
            }
            res.status(200).json(update);
        })
            .catch(err => {
                res.status(500).json({ errorMessage: 'The not could not be modified.' });
        });

    module.exports = router;