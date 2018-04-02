const express = require('express');
const Note = require('../models/NoteModel');
const router = express.Router();

router.get('/', (req, res) => {
  Note.find({})
    .then(res => {
      res.status(200).json(res);
    })
    .catch(err => {
      res.status(500).json({ error: 'Cannot retrieve notes' });
    })
});

router.post('/', (req, res) => {
  const { title, content } = req.body;
  const note = new Note({ title, content });
  note.save()
    .then(note => {
      res.status(200).json({ success: 'Note Saved' });
    })
    .catch(err => {
      res.status(500).json({ error: 'Cannot save note' });
    })
});

module.exports = router;