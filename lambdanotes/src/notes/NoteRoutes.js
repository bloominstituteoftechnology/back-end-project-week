const express = require('express');

const Note = require('./NoteSchema');

const router = express.Router();

router.post('/createNote', (req, res) => {
  const { title, content } = req.body;
  const note = new Note({ title, content });
  note
    .save()
    .then(savedNote => {
      res.status(201).json(savedNote);
    })
    .catch(err => {
      res.status(500).json({ msg: 'Error creating note', error: err });
    });
});

router.get('/displayNotes', (req, res) => {
  Note.find({})
    .then(notes => {
      res.status(200).json(notes);
    })
    .catch(err => {
      res.status(500).json({ msg: 'Error getting notes', error: err });
    });
});

module.exports = router;
