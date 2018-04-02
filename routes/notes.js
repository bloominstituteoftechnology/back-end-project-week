const express = require('express');

const { authUser, sendUserError } = require('../middleware');
const { STATUS_USER_ERROR } = require('../config.json');

const router = express.Router();

const Note = require('../models/notes');
const User = require('../models/users');

router.post('/new', authUser, (req, res) => {
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
                user.save();
            });
        })
        .catch(err => {
            sendUserError(err, res);
        });
});

router.post('/remove/:id', authUser, (req, res) => {
    Note.find({ _id: req.params.id, author: req.session.loggedIn }).remove()
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


module.exports = router;