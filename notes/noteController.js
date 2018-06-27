const router = require('express').Router();

const Notes = require('./noteModel');
const jwt = require('jsonwebtoken');
const secret = 'supersecretsauce';

function restricted(req, res, next) {
    const token = req.headers.authorization;

    if (token) {
        jwt.verify(token, secret, (err, decodedToken) => {
            req.jwtPayload = decodedToken;
            if (err) {
                return res.status(401).json({ errorMessage: 'Please Sign In' })
            }

            next();
        })
    } else {
        res.status(401).json({ errorMessage: 'Please Sign In' });
    }
}

// base route = '/note'

router.route('/create')
    .post((req, res) => {
        const newNote = (new Notes({ title, textBody, tags } = req.body));
        if (!title || !textBody){
            res.status(400).json({ errorMessage: 'Please provide a title and textBody for the note' });
        } else {
            newNote.save()
                .then(note => res.status(201).json(note))
                .catch(err => res.status(500))
        }
    })

router.route('/get/all')
    .get((req, res) => {
        Notes.find()
            .then(notes => res.json(notes))
            .catch(err => res.status(500).json({ errorMessage: 'The notes information could not be retrieved' }))
    })

router.route('/get/:id')
    .get((req, res) => {
        const { id } = req.params;
        Notes.findById(id)
            .then(note => {
                if (note === null) {
                    res.status(404).json({ errorMessage: 'Note with specified ID not found' });
                } else {
                    res.json(note);
                }
            })
            .catch(err => {
                if (err.name === "CastError") {
                    res.status(404).json({ errorMessage: 'Note with the specified ID not found' });
                } else {
                    res.status(500).json({ errorMessage: 'The note could not be retrieved' });
                }
            })
    })

router.route('/edit/:id')
    .put((req, res) => {
        const { id } = req.params;
        const changedNote = ({ title, textBody, tags } = req.body);
        if (!title || !textBody) {
            res.status(400).json({ errorMessage: 'Please provide a title and textBody for the note' });
            return;
        }
        Notes.findByIdAndUpdate(id, changedNote, {new: true})
            .then(note => {
                if (note === null) {
                    res.status(404).json({ errorMessage: 'Note with the specified ID not found' });
                } else {
                    res.json(note)
                }
            })
            .catch(err => {
                if (err.name === 'CastError') {
                    res.status(404).json({ errorMessage: 'Note with the specified ID not found' });
                } else {
                    res.status(500).json({ errorMessage: 'The note could not be modified' });
                }
            })
    })

router.route('/delete/:id')
    .delete((req, res) => {
        const { id } = req.params;
        Notes.findByIdAndRemove(id)
            .then(note => {
                if (note === null) {
                    res.status(404).json({ errorMessage: 'Note with the specified ID not found' });
                } else {
                    res.json(note)
                }
            })
            .catch(err => {
                if (err.name === 'CastError') {
                    res.status(404).json({ errorMessage: 'Note with the specified ID not found' });
                } else {
                    res.status(500).json({ errorMessage: 'The note could not be removed' });
                }
            })
    })

module.exports = router;