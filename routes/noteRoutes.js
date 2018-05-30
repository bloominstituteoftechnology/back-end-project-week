const express = require('express');
const router = express.Router();

const Note = require('../src/notes/Note');

router.route('/')
  .get((req, res) => {
    Note.find({})
      .then(notes => {
        if (!notes) {
          res.status(422).json({ error: "No notes found"})
        } else {
          res.status(200).json(notes)
        }
      })
      .catch();
  });
  
  

module.exports = router;