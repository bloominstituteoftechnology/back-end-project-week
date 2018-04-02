const express = require('express');

const { authUser, sendUserError } = require('../middleware');
const { STATUS_USER_ERROR } = require('../config.json');

const router = express.Router();

const Note = require('../models/notes');
const User = require('../models/users');

router.post('/new', (req, res) => {
    User.findById(req.session.loggedIn)
        .then(user => {
            const newNote = {
                title: req.body.title,
                entry: req.body.entry,
                author: req.session.loggedIn
            };
            Note.create(newNote, (err, note) => {
                if(err) {
                    throw new Error(err);
                }
                user.Notes.push(note);
                user.save()
                    .then(result => {
                        res.send(note);
                    })
                    .catch(err => {
                        sendUserError(err, res);
                    })
            });
        })
        .catch(err => {
            sendUserError(err, res);
        });
});

router.post('/remove/:id', (req, res) => {
    Note.findOneAndRemove({ _id: req.params.id, author: req.session.loggedIn })
        .then(note => {
            if(note) {
                res.send({ success: true });
            } else {
                sendUserError('No note found with that ID', res);
            }
        })
        .catch(err => {
            sendUserError(err, res);
        });
});

router.post('/edit/:id', (req, res) => {
    const { title, entry } = req.body;
    Note.findOneAndUpdate({ _id: req.params.id, author: req.session.loggedIn }, { title, entry }, { new: true })
        .then(note => {
            if(note) {
                res.send(note);
            } else {
                sendUserError('No note found with that ID', res);
            }
        })
        .catch(err => {
            sendUserError(err, res);
        });
});

router.get('/:id', (req, res) => {
    Note.findOne({ _id: req.params.id, author: req.session.loggedIn })
        .then(note => {
            if(note) {
                res.send(note);
            } else {
                sendUserError('No note found with that ID', res);
            }
        })
        .catch(err => {
            sendUserError(err, res);
        });
});

router.get('/', (req, res) => {
    Note.find({ author: req.session.loggedIn })
        .then(notes => {
            res.send(notes);
        })
        .catch(err => {
            sendUserError(err, res);
        });
});


module.exports = router;