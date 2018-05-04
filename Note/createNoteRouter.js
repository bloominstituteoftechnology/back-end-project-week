const express = require('express');
const router = express.Router();

//schema
const Note = require('./Note.js');

//endpoints
// This is just for quick checking
router.route('/').get((req, res) => {
  Note.find({})
    .then(notes => {
      if (notes.length === 0) {
        res.status(404).json({ error: 'No notes found!' });
      } else {
        res.status(200).json(notes);
      }
    })
    .catch(error => res.status(500).json(`Error from server: ${error}`));
});

router.post('/', (req, res) => {
  const note = req.body;
  Note.create(note)
    .then(note => res.status(201).json('Saved new note'))
    .catch(error => res.status(500).json(`Error from server: ${error}`));
});

module.exports = router;
