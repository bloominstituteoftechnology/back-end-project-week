const express = require('express');

const Note = require('./Note.js');

const router = express.Router();

router
  .route('/')
  .post((req, res) => {
    if (req.body.title && req.body.content) {
      const newNote = new Note(req.body);
      newNote
        .save()
        .then(saved => {
          res.status(201).json(saved);
        })
        .catch(err => {
          res.status(500).json(err);
        });
    } else {
      res.status(422).json('provide a title and content!');
    }
  })

  module.exports = router;