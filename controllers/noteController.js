const express = require('express');
const router = express();

const Note = require('../../models/Note');
const User = require('../../models/User');

router.get('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    Note.findById(req.params.id)
        .then(note => {
            if (note.user == req.user.id) {
                res.status(200).json(note)
            }
            else {
                res.status(400).json({ message: 'No note found' })
            }
        })
        .catch(err => res.status(500).json(err))

});


router.delete('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    Note.findById(req.params.id)
        .then(note => {
            if (note.user == req.user.id) {
                Note.findByIdAndRemove(req.params.id)
                    .then(note => {
                        return res.status(204).json(note)
                    })
            }
            else {
                res.status(400).json({ message: 'No note found' })
            }
        })
});

router.put('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    Note.findById(req.params.id)
        .then(note => {
            if (note.user == req.user.id) {
                Note.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
                    .then(note => {
                        return res.status(204).json(note)
                    })
            }
            else {
                res.status(404).json({ message: 'No not found' })
            }
        })
});
module.exports = router;