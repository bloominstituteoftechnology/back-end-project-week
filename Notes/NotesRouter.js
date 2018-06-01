const express = require('express');
const User = require('../Users/User');
const Note = require('./Notes.js');
const { protected } = require('../JWT');
const router = express.Router();

router
  .route('/:user')
  .get(protected,(req, res) => {
    User.findById(req.params.user)
      .populate('notes')
      .then(user => {
        if (!user) res.status(404).json('User Not Found!');
        else res.status(200).json(user);
      })
      .catch(err => {
        res.status(500).json("Error Finding User!!!");
      });
  })
  .post(protected,(req, res) => {
    if (req.body.title && req.body.content) {
      User.findById(req.params.user)
        .then(user => {
          if (!user) res.status(404).json('User Not Found!');
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
                res.status(500).json("Error Finding User!!!");
              });
          }
        })
        .catch(err => {
          res.status(500).json("Error");
        });
    } else {
      res.status(422).json('Please Provide Title and Content!!!');
    }
  });

router
  .route('/:user/:note')
  .get(protected, (req, res) => {
    Note.findById(req.params.note)
    .then(note => {
      if (!note) res.status(404).json('Note Not Found!');
      else res.status(200).json(note);
    })
    .catch(err => {
      res.status(500).json("Error Finding Note!!!");
    });
  })
  .put(protected, (req, res) => {
      Note.findByIdAndUpdate(req.params.note, { ...req.body })
    .then(note => {
      if (!note) res.status(404).json('Note Not Found!');
      else res.status(200).json(note);
    })
    .catch(err => {
      res.status(500).json("Error Finding Note!!!");
    });
  })
  .delete(protected, (req, res) => {
    Note.findByIdAndRemove(req.params.note)
    .then(note => {
      if (!note) res.status(404).json('Note Not Found!');
      else res.status(200).json(note);
    })
    .catch(err => {
      res.status(500).json("Error Deleting Note!!!");
    });
  });

module.exports = router;