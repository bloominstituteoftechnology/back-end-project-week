const express = require('express');
const Note = require('../models/NoteModel');
const router = express.Router();

router.get('/', (req, res) => {
  Note.find({})
    .then(notes => {
      res.status(200).send(notes);
    })
    .catch(err => {
      res.status(500).json({ error: 'Cannot retrieve notes' });
    })
});

router.get(`/:id`, (req, res) => {
  const id = req.params;
  Note.findById(id)
    .then(note => {
      res.status(200).json(note);
    })
    .catch(err => {
      res.status(500).json({ error: 'Cannot retrieve note' });
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

router.delete('/:id', (req, res) => {
  const id  = req.params;
  Note.findByIdAndRemove(id)
    .then(response => {
      res.status(200).json({ success: 'Note Deleted' });
    })
    .catch(err => {
      res.status(500).json({ error: 'Cannot delete note'});
    })
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const update = req.body;
  console.log('put', update);
  Note.findByIdAndUpdate(id, {$set: update}, {new: true})
    .then(updatedNote => {
      res.status(200).json(updatedNote);
    })
    .catch(err => {
      res.status(500).json({ error: 'Cannot update note' });
    })
});

module.exports = router;
