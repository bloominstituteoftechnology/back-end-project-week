const router = require('express').Router();
const jwt = require('jsonwebtoken');
const User = require('./userSchema');
const Note = require('../notes/notesSchema');
const secret = 'The world is my playground!';

function restricted(req, res, next) {
    const token = req.headers.authorization;

    if (token) {
        jwt.verify(token, secret, (error, decodeURIComponent) => {
            if (error) {
                res.status(401).json('You must login to create, edit and view notes.');
                return;
            }

            next();
        });
    }
    else {
        res.status(401).json('You must login to create, edit and view notes.');
    }
};

router.get('/:userId/notes/', restricted, (req, res) => {
    const { userId } = req.params;

    User.findOne({ _id: userId })
        .populate('notes', '_id title text')
        .then(user => {
            res.status(200).json({ username: user.username, notes: user.notes })
        })
        .catch(error => {
            res.status(500).json({ Error: error.message });
        })
});

router.get('/:userId/notes/:noteId', restricted, (req, res) => {
    const { userId, noteId } = req.params;

    User.findOne({ _id: userId, notes: noteId })
        .then(user => {
            Note.findById(noteId)
                .then(note => {
                    res.status(200).json({ title: note.title, text: note.text });
                })
                .catch(erro => {
                    res.status(401).json({ Error: error.message });
                })
        })
        .catch(error => {
            res.status(500).json({ Error: error.message }); 
        })
});

module.exports = router;

