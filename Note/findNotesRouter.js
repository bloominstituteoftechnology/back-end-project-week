const express = require('express');

//schema
const Note = require('./Note.js');

const router = express.Router();

router
.route('/')
.get((req, res) => {
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

module.exports = router;