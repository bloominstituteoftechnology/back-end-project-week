const notesControllers = require('../data/notescontrollers');
const express = require('express');
const router = express.Router();

router.get('/get/all/:user_id', (req, res) => {
  const id = req.params.user_id;
  notesControllers
    .getAllNotesByUserId(id)
    .then((notes) => res.status(200).json(notes))
    .catch((err) => res.status(500).json(err));
});
router.get('/get/:id', (req, res) => {
  const id = req.params.id;
  notesControllers
    .getNoteByNoteId(id)
    .then((note) => res.status(200).json(note))
    .catch((err) => res.status(500).json(err));
});
router.post('/create', (req, res) => {
  const newNote = req.body;
  if (newNote.title && newNote.textBody) {
    notesControllers
      .createNote(newNote)
      .then((id) => res.status(201).json(id))
      .catch((err) => res.status(500).json(err));
  } else {
    res.status(404).json({ err: 'Missing field(s)' });
  }
});
router.delete('/delete/:id', (req, res) => {
  const id = req.params.id;
  notesControllers
    .deleteNoteByNoteId(id)
    .then((count) => res.status(200).json(count))
    .catch((err) => res.status(500).json(err));
});
router.put('/edit/:id', (req, res) => {
  const id = req.params.id;
  const updatedNote = req.body;
  if (updatedNote.title && updatedNote.textBody) {
    notesControllers
      .updateNoteByNoteId(id, updatedNote)
      .then((count) => res.status(200).json(count))
      .catch((err) => res.status(500).json(err));
  } else {
    res.status(404).json({ err: 'Missing field(s)' });
  }
});
module.exports = router;
