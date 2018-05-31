const express = require('express');
const router = express.Router();

const Note = require('../src/notes/Note');

router.route('/')
  .get((req, res) => {
    Note.find({})
      .then(notes => {
        if (!notes) {
          res.status(422).json({ error: "No notes found"})
        } else {
          res.status(200).json(notes)
        }
      })
      .catch();
  });

router.route('/add')
  .post((req, res) => {
    const newNote = req.body;
    
    Note.create(newNote)
      .then(newNote => {
        res.status(201).json(newNote)
      })
      .catch(err => res.send({ error: err }));
  });
  

module.exports = router;