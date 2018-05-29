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

            if(notes.length === 0) {
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

router.post('/', passport.authenticate('jwt', {session: false}), (req, res) => {

    let noteFields = {};

    noteFields.user = req.user.id;
    noteFields.title = req.body.title;
    noteFields.description = req.body.description;

    new Note(noteFields).save().then(note => res.json(note));
});
module.exports = router;