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

noteRouter.put('/update', (req, res) => {
  const { title, content, _id } = req.body;
  console.log('Req body in noteRouter line 35: ', req.body);
  console.log('Now just the id: ', _id);
  if (!title || !content ) {
    return res.status(process.env.STATUS_USER_ERROR)
      .json({ error: 'Must Provide a title & content of note' });
  }

  Note.findById(_id, (err, note) => {
    if (err || note === null) {
      res.status(process.env.STATUS_USER_ERROR);
      res.json({ error: 'Cannot find note by that id' });
      return;
    }
    note.title = title;
    note.content = content;
    note.save((saveErr, savedNote) => {
      if (err || note === null) {
        res.status(process.env.STATUS_INTERNAL_SERVER_ERROR);
        res.json({ error: 'The server isn`t working properly' });
        return;
      }
      res.json(note);
    });
  });
});

noteRouter.delete('/destroy', (req, res) => {
  id = req.body._id;
  console.log('Request body of delete function: ', req.body);
  console.log("And now the note's id");
  if (id === undefined) {
    res.status(process.env.STATUS_USER_ERROR);
    res.json({ error: 'You need to give me an ID if you want to delete the note' });
    return;
  }
  Note.findByIdAndRemove(id, (err, removedNote) => {
    if (err) {
      res.status(process.env.STATUS_USER_ERROR);
      res.json({ error: 'Cannot find name by that id' });
      return;
    }
    res.json({ success: `${removedNote.title} was removed from the DB` });
  });
});

module.exports = noteRouter;
