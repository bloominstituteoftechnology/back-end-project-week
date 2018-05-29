const express = require('express');
const router = express.Router();

const Note = require('../models/NoteSchema');
const User = require('../models/UserSchema');

router.use((req, res, next) => {
  const session = req.session;
  if (session.username) {
    next();
  } else {
    res.status(400).json({ error: 'Not logged in' });
  }
});

router.get('/', (req, res) => {
  const { username } = req.session;
  User.findOne({ username })
    .populate('notes')
    .then(foundUser => {
      if (!foundUser) res.status(404).json({ msg: 'User does not exist' });
      res.status(200).json({ notes: foundUser.notes });
    })
    .catch(err => res.error(err));
});

router.get('/:id', (req, res) => {
  Note.findById(req.params.id)
    .then(note => res.status(200).json(note))
    .catch(err =>
      res
        .status(500)
        .json({ msg: 'There was an error retrieving the note.', error: err })
    );
});

router.post('/', (req, res) => {
  const noteInfo = req.body;
  const note = new Note(noteInfo);
  const session = req.session;
  if (req.body.username) {
    User.findOneAndUpdate(
      { username: req.body.username },
      { $push: { notes: noteInfo } },
      (err, note) => {
        if (err)
          res
            .status(500)
            .json({
              msg:
                'there was an error adding the note to the collaborator account',
              err,
            });
      }
    );
    return;
  }
  note
    .save()
    .then(savedNote => {
      User.findOne({ username: session.username }, (err, user) => {
        if (err)
          return res
            .status(500)
            .json({ msg: 'There was an error adding the note.' });
        user.notes.push(savedNote);
        user
          .save()
          .then()
          .catch(err =>
            res.status(500).json({
              msg: 'There was an error saving the the note to the account.',
              error: err,
            })
          );
      });
      res.status(200).json(savedNote);
    })
    .catch(err => {
      res
        .status(500)
        .json({ msg: 'There was an error saving the note.', error: err });
    });
});

router.put('/', (req, res) => {
  const note = req.body;
  Note.findByIdAndUpdate(note._id, note, { new: true })
    .then(updatedNote => {
      res.status(200).json(updatedNote);
    })
    .catch(err => {
      res
        .status(500)
        .json({ msg: 'There was an error updating the note.', error: err });
    });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  Note.findByIdAndRemove(id)
    .then(deletedNote => {
      res.status(200).json(deletedNote);
    })
    .catch(err => {
      res
        .status(500)
        .json({ msg: 'There was an error deleting the note.', error: err });
    });
});

module.exports = router;
