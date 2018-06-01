const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')

const Note = require('../models/Note');
const User = require('../models/User');

const server = express();


const validationToken = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        res
            .status(422)
            .json({ error: 'No Token in Header Error' });
    }
    else {
        jwt.verify(token, 'testingSecret', (err, decoded) => {
            if (err) {
                res
                    .status(401)
                    .json({ error: 'Invalid Token Error', message: err });
            } else {
                next();
            }
        });
    }
};

server.get('/', validationToken, (req, res) => {
    Note
        .findById(req.params.id)
        .then(note => {
            if (note.user == req.user.id) {
                res.status(200).json(note)
            } else {
                res.status(400).json({ message: 'Note Get Error' })
            }
        })
        .catch(err => res.status(500).json(err))
});

server.get('/:id', validationToken, (req, res) => {
    Note
        .findById(req.params.id)
        .then(note => {
            if (note.user == req.user.id) {
                res.status(200).json(note)
            } else {
                res.status(400).json({ message: 'Note Get Error' })
            }
        })
        .catch(err => res.status(500).json(err))
});


server.delete('/:id', validationToken, (req, res) => {
    Note
        .findById(req.params.id)
        .then(note => {
            if (note.user == req.user.id) {
                Note.findByIdAndRemove(req.params.id)
                    .then(note => {
                        return res.status(204).json(note)
                    })
            } else {
                res.status(400).json({ message: 'Note not found' })
            }
        })
});

server.post('/', validationToken, (req, res) => {
    const newNote = new Note(req.body);
    if (newNote.username === req.params.username) {
        newNote
            .save()
            .then(note => {
                res.status(200).json(note);
            })
            .catch(err => {
                res.status(500).json({ errorMessage: 'Note Post Error' });
            });
    } else res.status(500).json({ errorMessage: 'Note Post Error' });
})

server.put('/:id', validationToken, (req, res) => {
    Note
        .findById(req.params.id)
        .then(note => {
            if (note.user == req.user.id) {
                Note.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
                    .then(note => {
                        return res.status(204).json(note)
                    })
            } else {
                res.status(404).json({ message: 'Note not found' })
            }
        })
});
module.exports = router;