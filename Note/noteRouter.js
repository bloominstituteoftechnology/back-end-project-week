const express = require('express');
const router = express.Router();
const Note = require('./noteModel');
const User = require('../User/userModel');
const { restricted } = require('../authentication');

// GET
router.get('/notes', restricted, (req, res) => {
  User
    .findById(req.user._id)
    .select('-password')
    .populate('notes')
    .then(user => res.json(user))
    .catch(err => res.status(500).json(err));
});

// POST
router.post('/add', restricted, (req, res) => {
  const { _id, notes } = req.user || req.body;
  const { title, body } = req.body;

  if (!body) {
    res.status(422).json({ message: 'Note must have a body' });
  } else {
    const newNote = new Note({ title, body });
    newNote
      .save()
      .then(newNote => {
        notes.push(newNote._id);
        return notes;
      })
      .then(notes => {
        User.findByIdAndUpdate(_id, { notes })
          .then(user => {
            User.findById(user._id)
              .select('-password')
              .populate('notes')
              .then(updatedUser => {
                res.json(updatedUser);
              })
              .catch(err => res.status(500).json(err));
          })
          .catch(err => res.status(500).json(err));
      })
      .catch(err => res.status(500).json(err));
  }
});

// PUT
router.put('/edit', restricted, (req, res) => {
  const { _id, title, body } = req.body;
  let change = { title, body };

  if (!title && !body) {
    res.status(400).json({ message: 'Must enter an update' });
  }

  Note
    .findByIdAndUpdate(_id, change)
    .then(toChange => {
      User
        .findById(req.user._id)
        .select('-_id notes')
        .populate('notes')
        .then(user => res.json(user))
        .catch(err => res.status(500).json(err));
    });
});

// DELETE
router.delete('/delete/:id', restricted, (req, res) => {
  const id = req.params.id;
  let { notes, _id } = req.user;

  notes = notes.filter(note => note.toString() !== id);

  User.findByIdAndUpdate(_id, { notes })
    .then(user => {
      User
        .findById(user._id)
        .select('-password')
        .populate('notes')
        .then(updatedUser => {
          Note.findByIdAndRemove(id).then(removedNote => {
            res.json(updatedUser);
          });
        })
        .catch(err => res.status(500).json(err));
    })
    .catch(err => res.status(500).json(err));
});

module.exports = router;