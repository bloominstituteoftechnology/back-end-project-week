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
  });

router
  .route('/')
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

module.exports = router;