const express = require('express');
const jwt = require('jsonwebtoken');
const router = express();
const passport = require('passport');

const Note = require('../../models/Note');
const User = require('../../models/User');
router.get('/testing', passport.authenticate('jwt', {session: false}),
    (req, res) => {

        res.status(200).json({message: 'Note Testing is Working'});

    });

router.get('/', passport.authenticate('jwt', {session: false}), (req, res) => {

    Note.find({user: req.user.id})
        .then(notes => {

            if (notes.length === 0) {
                res.status(404).json({message: 'You have not created any notes yet'})
            }
            else {
                res.status(200).json(notes);
            }

        })
        .catch(err => {
            res.status(500).json(err);
        })
});

router.get('/:id', passport.authenticate('jwt', {session: false}), (req, res) => {

    Note.findById(req.params.id)
        .then(note => {
            if (note.user == req.user.id) {

                res.status(200).json(note)
            }
            else {
                res.status(400).json({message: 'No note found'})
            }
        })
        .catch(err => res.status(500).json(err))

});

router.post('/', passport.authenticate('jwt', {session: false}), (req, res) => {

    let noteFields = {};

    noteFields.user = req.user.id;
    noteFields.title = req.body.title;
    noteFields.description = req.body.description;

    new Note(noteFields).save().then(note => res.json(note));
});

router.delete('/:id', passport.authenticate('jwt', {session: false}), (req, res) => {

    Note.findById(req.params.id)
        .then(note => {

            if (note.user == req.user.id) {

                Note.findByIdAndRemove(req.params.id)
                    .then(note => {
                        return res.status(204).json(note)
                    })
            }
            else {
                res.status(400).json({message: 'No note found'})
            }
        })

});

router.put('/:id', passport.authenticate('jwt', {session: false}), (req, res) => {

    Note.findById(req.params.id)
        .then(note => {

            if (note.user == req.user.id) {

                Note.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true})
                    .then(note => {
                        return res.status(204).json(note)
                    })
            }
            else {
                res.status(404).json({message: 'No not found'})
            }
        })
});
module.exports = router;