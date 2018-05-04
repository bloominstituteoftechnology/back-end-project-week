const express = require('express');

const User = require('../users/User.js');
const Note = require('./Note.js');

const router = express.Router();

router
  .route('/:user')
  .get((req, res) => {
    User.findById(req.params.user)
      .populate('notes')
      .then(user => {
        if (!user) res.status(404).json('user not found!');
        else res.status(200).json(user);
      })
      .catch(err => {
        res.status(500).json("something bad happened");
      });
  })
  .post((req, res) => {
    if (req.body.title && req.body.content) {
      User.findById(req.params.user)
        .then(user => {
          if (!user) res.status(404).json('user not found!');
          else {
            const newNote = new Note({ ...req.body, "user_id": req.params.user });
            newNote
              .save()
              .then(saved => {
                user.addNote(saved._id);
                user.save();
                res.status(201).json(saved);
              })
              .catch(err => {
                res.status(500).json("something bad happened");
              });
          }
        })
        .catch(err => {
          res.status(500).json("something bad happened");
        });
    } else {
      res.status(422).json('provide a title and content!');
    }
  });

router
  .route('/:user/:note')
  .get((req, res) => {
    Note.findById(req.params.note)
    .then(note => {
      if (!note) res.status(404).json('note not found!');
      else res.status(200).json(note);
    })
    .catch(err => {
      res.status(500).json("something bad happened");
    });
  })
  .put((req, res) => {
      Note.findByIdAndUpdate(req.params.note, { ...req.body })
    .then(note => {
      if (!note) res.status(404).json('note not found!');
      else res.status(200).json(note);
    })
    .catch(err => {
      res.status(500).json("something bad happened");
    });
  })
  .delete((req, res) => {
    Note.findByIdAndRemove(req.params.note)
    .then(note => {
      if (!note) res.status(404).json('note not found!');
      else res.status(200).json(note);
    })
    .catch(err => {
      res.status(500).json("something bad happened");
    });
  });

module.exports = router;
