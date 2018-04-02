const env = require('dotenv').config();
const express = require('express');
const Note = require('../models/noteModel');
const noteRouter = express.Router();

noteRouter.post('/new', function(req, res) {
  const noteInfo = req.body;
  const newNote = new Note(noteInfo);
    if(!newNote.title || !newNote.content) {
      res.status(env.STATUS_BAD_REQUEST)
        .json({error: 'A new note must have both a Title and Content'});
    } else {
      newNote
        .save()
        .then(savedNote => {
          res.status(env.STATUS_CREATED).json(savedNote);
        })
        .catch(err => {
          if (err) console.error(err);
        });
    }
});

module.exports = noteRouter;
