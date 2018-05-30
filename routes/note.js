const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const passport = require('passport');

const Note = require('../modules/notes');
const User = require('../modules/users');

router
  .route('/')
  .get(passport.authenticate('jwt', {session: false}), (req, res) => {
    Note.find({user: req.user.id})
    .then(notes => {
      if (notes.length === 0) {
        res.status(404).json('You have not made any notes')
      }
      res.status(200).json(notes)
    })
    .catch(err => {
      res.status(500).json(err);
    })
  })
  .post(passport.authenticate('jwt', {session: false}), (req, res) => {
    let noteContent = {};
    noteContent.user = req.user.id;
    noteContent.title = req.body.title;
    noteContent.body = req.body.body;

    new Note(noteContent).save().then(note => res.json(note));
  });

router
  .route('/:id')
  .get(passport.authenticate('jwt', {session: false}), (req, res) => {
    Note.findById(req.params.id)
      .then(note => {
        if (note.user === req.user.id) {
          res.status(200).json(note);
        }
        res.status(400).json('Not authorized to view note');
      })
      .catch(err => {
        res.status(500).json(err);
      })
  })
  .delete(passport.authenticate('jwt', {session: false}), (req, res) => {
    Note.findById(req.params.id)
      .then(note => {
        if (note.user === req.user.id) {
          Note.findByIdAndRemove(req.params.id) 
            .then(note => {
              return res.status(204).json(note);
            })
        }
        res.status(400).json('No note found');
      })
  })
  .put(passport.authenticate('jwt', {session: false}), (req, res) => {
    Note.findById(req.params.id)
      .then(note => {
        if (note.user === req.user.id) {
          Note.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true})
            .then(note => {
              res.status(200).json(note)
            })
        }
        res.status(404).json('No note found');
      })
  });

module.exports = router;