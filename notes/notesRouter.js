const express = require('express');
const router = express.Router();

const restricted = require('../auth/restricted');
const Note = require('./Note.js');

//End Points
router
  .route('/')
  .post(restricted, (req, res) => {
    Note.create(req.body)
      .then(note => {
        res.status(201).json(note);
      })
      .catch(err => {
        res
          .status(500)
          .json({ message: 'Error saving data to the DB', error: err });
      });
  })
  .get(restricted, (req, res) => {
    Note.find()
      .then(notes => {
        res.status(200).json(notes);
      })
      .catch(err => {
        res
          .status(500)
          .json({ message: 'Something really bad happened', error: err });
      });
  })
  .put(restricted, (req, res) => {
    res.status(422).json({ message: 'Id not provided' });
  })
  .delete((req, res) => {
    res.status(422).json({ message: 'Id not provided' });
  })

router
  .route('/:id')
  .get(restricted, (req, res) => {
    const { id } = req.params;
    Note.findById(id)
      .then(note => {
        if (note) {
          res.json(note);
        } else {
          res.status(404).json({ error: 'The note with the specified ID does not exist.' });
        }
      })
      .catch(err => {
        res
          .status(500)
          .json({ message: 'Something really bad happened', error: err });
      });
  })
  .put(restricted, (req, res) => {
    const { id } = req.params;
    const changes = req.body;

    //Returns the updated register
    const options = {
      new: true
    }
    Note.findByIdAndUpdate(id, changes, options )
      .then(note => {
        if (note) {
          res.json(note);
        } else {
          res.status(404).json({ message: 'Note not found' });
        }
      })
      .catch(err => {
        res
          .status(500)
          .json({ message: 'Something really bad happened', error: err });
      });
  })
  .delete(restricted, (req, res) => {
    const { id } = req.params;
    Note.findByIdAndRemove(id)
      .then(note => {
        if (note) {
          res.json({ message: 'Note deleted' });
        } else {
          res.status(404).json({ message: 'Note not found' });
         }
       })
       .catch(err => res.status(500).json(err));
});

module.exports = router;