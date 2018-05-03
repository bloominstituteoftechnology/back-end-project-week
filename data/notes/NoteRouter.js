const express = require('express');
const Note = require('./NoteModel');
const validate = require('../../assets/middlewares/validate');

const router = express.Router();
router.use(validate);

router
    .get('/', (req, res) => {
        if (!req.user) {
            res.status(400).json({ message: 'You are not logged in.'})
        } else {
            Note
                .find({ username: req.user.username })
                .then(notes => res.status(200).json(notes))
                .catch(err => res.status(500).json(err));
        }
    })
    .get('/:noteId', (req, res) => {
        if (!req.user) {
            res.status(400).json({ message: 'You are not logged in.'})
        } else {
            const { noteId } = req.params
            Note
                .findById({ noteId })
                .then(note => res.status(200).json(note))
                .catch(err => res.status(500).json(err));
        }
    })
    .post('/', (req, res) => {        
        if (!req.user) {
            res.status(400).json({ message: 'You are not logged in.'})
        } else {
            const { title, text } = req.body
            console.log(req.user.username);
            const note = new Note({
                username: req.user.username, 
                title, 
                text
            });
            note
                .save()
                .then(savedNote => res.status(200).json(savedNote))
                .catch(err => res.status(500).json(err));
        }
    })    
    .put('/:noteId', (req, res) => {
        if (!req.user) {
            res.status(400).json({ message: 'You are not logged in.'})
        } else {
            const { title, text } = req.body;
            const { noteId } = req.params;
            Note
                .findByIdAndUpdate(noteId, { title, text })
                .then(updatedNote => res.status(200).json(updatedNote))
                .catch(err => res.status(500).json(err));
        }
    })
    .delete('/:noteId', (req, res) => {
        if (!req.user) {
            res.status(400).json({ message: 'You are not logged in.'})
        } else {
            const { noteId } = req.params;
            Note
                .findByIdAndRemove(noteId)
                .then(response => res.status(200).json(response))
                .catch(err => res.status(500).json(err));
        }
    });

module.exports = router;