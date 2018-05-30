const express = require('express');

const Note = require('./noteModel.js');

const router = express.Router();

router
  .route('/')
  .get((req, res) => {
    Note.find()
    .then(notes => {
      res.status(200).json(notes);
    })
    .catch(err => {
      res.status(500).json( { errorMessage: "Error getting note data." });
    });
  })
  .post((req, res) => {
    const noteData = req.body;
    const note = new Note(noteData);
    note
      .save()
      .then(note => {
        res.status(201).json(note);
      })
      .catch(err => {
        if(err.name === 'ValidationError') {
          res.status(400).json({ errorMessage: "Please provide title and text for your note." });
        } else {
          res.status(500).json({ errorMessage: "There was an error while saving your note." })
        };
      });
  });

router
.route('/:id')
.get((req, res) => {
  Note.find({ _id: req.params.id })
  .then(note => {
    if (note.length > 0) {
      res.status(201).json({ note })
    } else {
      res.status(404).json({ errorMessage: "The note with the specified ID does not exist." });
    }
  })
  .catch(err => {
    res.status(500).json({ errorMessage: "Note information could not be retrieved." });
  });
});

module.exports = router;