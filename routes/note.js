const express = require('express');
const router = express.Router();

const Note = require('../modules/notes');
const User = require('../modules/users');

router
  .route('/')
  .get((req, res) => {
    Note.find()
    .select('title body -_id')
    .then(notes => {
      if (notes.length === 0) {
        res.status(404).json('You have not made any notes');
      } else {
        res.status(200).json(notes);
      }
    })
    .catch(err => {
      res.status(500).json(err);
    })
  })
  .post((req, res) => {
   Note
    .create(req.body)
    .then(note => {
      res.status(200).json(note);
    })
    .catch(err => {
      res.status(500).json('Error creating note');
    })
  });

router
  .route('/:id')
  .get((req, res) => {
    Note.findById(req.params.id)
      .then(note => {
        if (note.user === req.user.id) {
          res.status(200).json(note);
        }
        res.status(400).json('Not authorized to view note');
      })
      .catch(err => {
        res.status(500).json(err);
      })
  })
  .delete((req, res) => {
    const id = req.params.id;
    Note
      .findByIdAndRemove(id)
      .then(response => {
        res.status(200).json('Note deleted successfully');
      })
      .catch(err => {
        res.status(500).json('error deleting note');
      })
  })
  .put((req, res) => {
    const id = req.params.id;
    const note = req.body;
    Note 
      .findByIdAndUpdate(id, note)
      .then(response => {
        res.status(200).json({ note });
      })
      .catch(err => {
        res.status(500).json('Error updating note');
      })
  });

module.exports = router;