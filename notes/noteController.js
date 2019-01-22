const router = require('express').Router();

const Notes = require('./noteModel');
const User = require('../users/userModel');
const jwt = require('jsonwebtoken');

// base route = '/note'

router.route('/create/:id')
    .post((req, res) => {
        const newNote = (new Notes({ title, textBody, tags } = req.body));
        const userId = req.params.id;
        if (!title || !textBody){
            res.status(400).json({ errorMessage: 'Please provide a title and textBody for the note' });
        } else {
            newNote.save()
                .then(note => {
                    User.findByIdAndUpdate(userId, { $push: {notes: note._id} }, {new: true})
                        .then(updatedUser => res.status(200))
                        .catch(err => {res.status(500)})
                    res.status(201).json(note)
                })
                .catch(err => res.status(500))
        }
    })

router.route('/get/all')
    .get((req, res) => {
        const { _id } = req.query;
        console.log("req.query: ", req.query);
        console.log("_id: ", _id);
        User.findById(_id)
            .populate('notes')
            .then(currentUser => res.json(currentUser.notes))
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
                    User.findOneAndUpdate({notes: id}, { $pull: {notes: id} }, {new: true})
                        .then(user => res.json(note))
                        .catch(err => res.json({ errorMessage: 'could not delete note reference from user' }))
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