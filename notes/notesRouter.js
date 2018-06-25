const express = require('express');
const router = express.Router();
const Note = require('./Note');

router.post('/', (req, res) => {
  const { title, content, tags } = req.body;
  const noteData = {title: title, content: content, tags: tags};
  const note = new Note(noteData);
  note.save()
    .then(note => res.status(201).json(note))
    .catch(err => res.status(500).json(err));
})

router.get('/', (req, res) => {
  Note.find()
    .then(notes => res.json(notes))
    .catch(err => res.status(500).json(err));
})

router.get('/:id', (req, res) => {
  Note.findById(req.params.id)
    .then(note => res.status(200).json(note))
    .catch(err => res.status(500).json(err));
})

router.delete('/:id', (req, res) => {
  Note.findByIdAndRemove(req.params.id)
    .then(note => {
      if (note) res.status(200).json(note);
      else res.status(404).json({Message: 'Note not found'});
    })
    .catch(err => res.status(500).json(err));
})

router.put('/:id', (req, res) => {
  const { title, content, tags } = req.body;
  const updatedNote = {title: title, content: content, tags: tags};
  Note.findByIdAndUpdate(req.params.id, updatedNote)
    .then(note => {
      if (note) res.status(200).json(note)
      else res.status(404).json({Message: 'Note not found'});
    })
    .catch(err => res.status(500).json(err));
})

module.exports = router;