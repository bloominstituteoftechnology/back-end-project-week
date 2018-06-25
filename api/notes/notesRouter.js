const express = require('express');

const Note = require('./Note.js');

const router = express.Router();

//End Points
router
  .route('/')
  .get((req, res) => {
    Note
      .find()
      .then(foundNotes => 
        res.json(foundNotes)
      )
      .catch(err => 
        res.status(500).json(err)
      )
  })
  .post((req, res) => {
    const note = req.body;
    const newNote = new Note(note);
    newNote
      .save()
      .then(savedNote => 
        res.status(201).json(savedNote)
      )
      .catch(err => 
        res.status(422).json({ error: err })
      )
  })


module.exports = router;