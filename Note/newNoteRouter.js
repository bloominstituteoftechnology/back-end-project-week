const express = require('express');
const router = express.Router();
const Note = require('./Note');
const User = require('../User/User');
const { restricted } = require('../secrets/security');

router.post('/', restricted, (req, res) => {
  const { _id, notes } = req.user || req.body;
  const { title, body } = req.body;
  if (!title) {
    res
      .status(422)
      .json({ message: 'Title is required to create a new note.' });
  } else {
    const note = new Note({ title, body });
    note
      .save()
      .then(note => {
        const note_id = note._id;
        console.log(note_id, 'note');
        console.log(note_id);
        notes.push(note_id);
        console.log(notes, 'added');
        // res.json(note);
        return notes;
      })
      .then(notes => {
        User.findByIdAndUpdate(_id, { notes })
          .then(user => {
            User.findById(user._id)
              .select('-password')
              .populate('notes')
              .then(finalUser => {
                res.json(finalUser);
              })
              .catch(err => res.status(500).json(err));
          })
          .catch(err => res.status(500).json(err));
      })
      .catch(err => res.status(500).json(err));
  }
});

module.exports = router;
