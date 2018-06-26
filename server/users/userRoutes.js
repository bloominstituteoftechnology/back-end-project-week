const router = require('express').Router();
const jwt = require('jsonwebtoken');
const User = require('./User');
const Note = require('../notes/Note');
const secret = 'The world is my playground!';

function restricted(req, res, next) {
    const token = req.headers.authorization;

    if (token) {
        jwt.verify(token, secret, (error, decodeURIComponent) => {
            if (error) {
                console.log('Error', error)
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
    User.findById(userId)
        .populate('notes', '-_id title text')
        .then(user => {
            if (user === null) {
                res.status(404).json('Page not found!');
                return;
            }
            else {
                res.status(200).json({ username: user.username, notes: user.notes })
            }
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
                    if (note === null) {
                        res.status(401).json('Resource not found!');
                        return;
                    }
                    else {
                        res.status(200).json({ title: note.title, text: note.text });
                    }
                })
                .catch(error => {
                    res.status(401).json({ Error: error.message });
                })
        })
        .catch(error => {
            res.status(500).json({ Error: error.message });
        })
});

router.post('/:userId/notes/', restricted, (req, res) => {
    const { userId } = req.params;

    const { title, text } = req.body;

    Note.create({ title, text })
        .then(note => {
            User.findByIdAndUpdate(userId, { $push: { notes: note._id } }, { new: true })
                .then(user => {
                    if (user === null) {
                        Note.remove({ _id: note.id })
                            .then(note => {
                                res.status(401).json('Resource not found!')
                            })
                            .catch(error => {
                                res.status(500).json({ Error: error.message }); 
                            })
                    }
                    else {
                        res.status(201).json({ username: user.username, notes: user.notes })
                    }
                })
                .catch(error => {
                    res.status(500).json({ Error: error.message });
                })
        })
        .catch(error => {
            res.status(500).json({ Error: error.message });
        })
});

router.put('/:userId/notes/:noteId', restricted, (req, res) => {
    const { userId, noteId } = req.params;
    const { title, text } = req.body;

    User.findOne({ _id: userId, notes: noteId })
        .then(user => {
            if (user === null) {
                res.status(401).json('Resource not found!');
                return;
            }
            else {
                Note.findByIdAndUpdate(noteId, { title, text }, { new: true })
                    .then(note => {
                        res.status(200).json({ title: note.title, text: note.text });
                    })
                    .catch(error => {
                        res.status(500).json({ Error: error.message });
                    })
            }
        })
        .catch(error => {
            res.status(500).json({ Error: error.message });
        })
});

router.delete('/:userId/notes/:noteId', restricted, (req, res) => {
    const { userId, noteId } = req.params;

    User.findByIdAndUpdate(userId, { $pull: { notes: noteId } }, { new: true })
        .then(user => {
            if (user === null) {
                res.status(401).json('Resource not found!');
                return;
            }
            else {
                Note.remove({ _id: noteId })
                    .then(note => {
                        res.status(200).json('The note was deleted successfully.');
                    })
                    .catch(error => {
                        res.status(500).json({ Error: error.message });
                    })
            }
        })
        .catch(error => {
            res.status(500).json({ Error: error.message });
        })
});

module.exports = router;

