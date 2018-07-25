const server = require('express').Router();

const Note = require('../models/Note');

server.get('/', (req, res) => {
    Note.find()
        .then(notes => {
            res.status(200).json(notes);
        })
        .catch(err => {
            res
                .status(500)
                .json({ message: 'There was a problem getting your notes', error: err });
        });
});

server.get('/:id', (req, res) => {
    const { id } = req.params;

    Note.findById(id)
        .then(note => {
            if (note !== null) {
                res.status(200).json(note);
            } else {
                res.status(404).json({ message: "That not could not be found." })
            }
        })
        .catch(err => {
            res
                .status(500)
                .json({ message: 'There was a problem getting your note', error: err });
        });
});

server.post('/', async (req, res) => {
    Note.create(req.body)
        .then(note => {
            res.status(201).json(note);
        })
        .catch(err => {
            res
                .status(500)
                .json({ message: 'Error saving note to the DB', error: err });
        });
});

server.put('/:id', (req, res) => {
    const { id } = req.params;
    const changes = req.body;
    const options = {
        new: true,
    };

    Note.findByIdAndUpdate(id, changes, options)
        .then(note => {
            if (note) {
                res.status(200).json(note);
            } else {
                res.status(404).json({ message: 'Note not found' });
            }
        })
        .catch(err => {
            res
                .status(500)
                .json({ message: 'There was a problem finding that note', error: err });
        });
});

server.delete('/:id', (req, res) => {
    const { id } = req.params;

    if (!id) {
        res.status(422).json({ message: 'You need to give me an ID' });
    } else {
        Note.findByIdAndRemove(id)
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

module.exports = server;