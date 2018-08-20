const express = require('express');
const router = express.Router();
const db = require('../data/helpers/notesDb');

router.get('/', (req, res, next) => {
  db
    .getNotes()
    .then(response => {
      res
        .status(200)
        .json(response)
    })
    .catch(err => console.log(err))
})

router.get('/:id', (req, res, next) => {
  const id = req.params.id;
  db
    .getNote(id)
    .then(response => {
      res
        .status(200)
        .json(response)
    })
    .catch(err => console.log(err))
})

router.post('/', (req, res, next) => {
  const note = req.body;
  db
    .addNote(note)
    .then(response => {
      res
        .status(200)
        .json(response)
    })
    .catch(err => console.log(err))
})

module.exports = router;