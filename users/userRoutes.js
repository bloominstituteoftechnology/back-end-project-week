const router = require('express').Router();
const jwt = require('jsonwebtoken');
const User = require('./User');
const Note = require('../notes/Note');
require('dotenv').config();
const secret = process.env.secret;
let decoded;

function restricted(req, res, next) {
    const token = req.headers.authorization;
    if (token) {
        jwt.verify(token, secret, (error, decodeURIComponent) => {
            if (error) {
                res.status(401).json('You must login to create, edit and view notes.');
                return;
            }
            decoded = jwt.verify(token, secret);
            next();
        });
    }
    else {
        res.status(401).json('You must login to create, edit and view notes.');
    }
};

function errorReturn(error, msg) {
    const fields = ['title', 'text']
    for (let key in error) {
        for (let field = 0; field < fields.length; field++) {
            if (key === fields[field]) {
                return {
                    path: key,
                    status: 400,
                    message: error[key].message
                }
            }
        }
    }
    return {
        path: null,
        status: 500,
        message: msg
    }
};

router.get('/:userId/notes/', restricted, (req, res) => {
    const { userId } = req.params;
    User.findById(userId)
        .populate('notes', '_id title text')
        .then(user => {
            if (user === null) {
                res.status(404).json('The requested resource was not found.');
                return;
            }
            else if (user.username !== decoded.name) {
                res.status(404).json('The requested resource was not found.');
                return;
            }
            else {
                console.log('Notes', user.notes);
                res.status(200).json({ id: user._id, username: user.username, notes: user.notes })
            }
        })
        .catch(error => {
            res.status(500).json('An internal server error occurred while retrieving notes from the database.');
        })
});

router.get('/:userId/notes/:noteId', restricted, (req, res) => {
    const { userId, noteId } = req.params;
    User.findOne({ _id: userId, notes: noteId })
        .then(user => {
            if (user === null) {
                res.status(404).json('The requested resource was not found.');
                return;
            }
            else if (user.username !== decoded.name) {
                res.status(404).json('The requested resource was not found.');
                return;
            }
            else {
                Note.findById(noteId)
                    .then(note => {
                        if (note === null) {
                            res.status(404).json('The requested resource was not found.');
                            return;
                        }
                        else {
                            res.status(200).json({ id: note._id, title: note.title, text: note.text });
                        }
                    })
                    .catch(error => {
                        res.status(500).json('An internal server error occurred while retrieving a note from the database.');
                    })
            }
        })
        .catch(error => {
            res.status(500).json('An internal server error occurred while retrieving a note from the database.');
        })
});

router.post('/:userId/notes/', restricted, (req, res) => {
    const { userId } = req.params;
    const { title, text } = req.body;
    User.findById(userId)
        .then(user => {
            if (user === null) {
                res.status(404).json('The requested resource was not found.');
                return;
            }
            else if (user.username !== decoded.name) {
                res.status(404).json('The reqested resource was not found.');
                return;
            }
            else {
                Note.create({ title, text })
                    .then(note => {
                        User.findByIdAndUpdate(userId, { $push: { notes: note._id } }, { new: true, runValidators: true })
                            .populate('notes', '_id title text')
                            .then(user => {
                                res.status(201).json({ id: user._id, username: user.username, notes: user.notes });
                            })
                            .catch(error => {
                                res.status(500).json('An internal server error occurred while adding a note to the database.');
                            })
                    })
                    .catch(error => {
                        let errorReceived = errorReturn(error.errors, 'An internal server error occurred while adding a note to the database.');
                        res.status(errorReceived.status).json([errorReceived.path, errorReceived.message]);
                    })
            }
        })
        .catch(error => {
            res.status(500).json('An internal server error occurred while adding a note to the database.');
        })
});

router.put('/:userId/notes/:noteId', restricted, (req, res) => {
    const { userId, noteId } = req.params;
    const { title, text } = req.body;
    User.findById(userId)
        .then(user => {
            if (user === null) {
                res.status(404).json('The requested resource was not found.');
                return;
            }
            else if (user.username !== decoded.name) {
                res.status(404).json('The requested resource was not found.');
                return;
            }
            else {
                User.findOne({ _id: userId, notes: noteId })
                    .then(user => {
                        if (user === null) {
                            res.status(404).json('The requested resource was not found.');
                            return;
                        }
                        else {
                            Note.findByIdAndUpdate(noteId, { title, text }, { new: true, runValidators: true })
                                .then(note => {
                                    res.status(200).json({ title: note.title, text: note.text });
                                })
                                .catch(error => {
                                    let errorReceived = errorReturn(error.errors, 'An internal server error occurred while modifying a note from the database.');
                                    res.status(errorReceived.status).json([errorReceived.path, errorReceived.message]);
                                })
                        }
                    })
                    .catch(error => {
                        res.status(500).json('An internal server error occurred while modifying a note from the database.');
                    })
            }
        })
        .catch(error => {
            res.status(500).json('An internal server error occurred while modifying a note from the database.');
        })
});

router.delete('/:userId/notes/:noteId', restricted, (req, res) => {
    const { userId, noteId } = req.params;
    User.findById(userId)
        .then(user => {
            if (user === null) {
                res.status(404).json('The requested resource was not found.');
                return;
            }
            else if (user.username !== decoded.name) {
                res.status(404).json('The requested resource was not found.');
                return;
            }
            else {
                Note.findByIdAndRemove(noteId)
                    .then(note => {
                        if (note.n === 0) {
                            res.status(404).json('The reqested resource was not found.');
                            return;
                        }
                        else {
                            User.findByIdAndUpdate(userId, { $pull: { notes: noteId } }, { new: true, runValidators: true })
                                .then(user => {
                                    if (user === null) {
                                        res.status(404).json('The requested resource was not found.');
                                        return;
                                    }
                                    else {
                                        console.log('user', user);
                                        res.status(200).json('The note was succesfully deleted.');
                                    }
                                })
                                .catch(error => {
                                    res.status(500).json('An internal server error occurred while deleting a note from the database.');
                                })
                        }
                    })
                    .catch(error => {
                        res.status(500).json('An internal server error occurred while deleting a note from the database.');
                    })
            }
        })
        .catch(error => {
            res.status(500).json('An internal server error occurred while deleting a note from the database.');
        })
});

module.exports = router;

