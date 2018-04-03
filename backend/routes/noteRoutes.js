require('dotenv').config();
const express = require('express');
const Note = require('../models/noteModel');
const { validateToken } = require('../services/auth');
const { getNotes } = require('../controllers');
const noteRouter = express.Router();

noteRouter.post('/new', function(req, res) {
  const noteInfo = req.body;
  const newNote = new Note(noteInfo);
    if(!newNote.title || !newNote.content) {
      res.status(process.env.STATUS_BAD_REQUEST)
        .json({error: 'A new note must have both a Title and Content'});
    } else  if (!newNote.user) {
      res.status(process.env.STATUS_BAD_REQUEST)
        .json({error: 'You must log in to save a new note'});
    } else {
      newNote
        .save()
        .then(savedNote => {
          res.status(process.env.STATUS_CREATED).json(savedNote);
        })
        .catch(err => {
          if (err) console.error(err);
        });
    }
});

noteRouter.get('/', getNotes, validateToken);

module.exports = noteRouter;
