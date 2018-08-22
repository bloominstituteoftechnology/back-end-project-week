const express = require('express');
const router = express.Router();
const db = require('../data/helpers/notesDb');

// GET (Postman Test: OK)
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

// GET by ID (Postman Test: OK)
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


// POST (Postman Test: OK)
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

// PUT (POSTMAN: OK)
router.put('/:id', (req, res, next) => {
    const id = req.params.id;
    const note = req.body;
    db
      .editNote(id, note)
      .then(response => {
        res
          .status(200)
          .json(response)
      })
      .catch(err => console.log(err))
  })

// DELETE (POSTMAN: OK)
router.delete('/:id', (req, res, next) => {
    const id = req.params.id;
    db
      .deleteNote(id)
      .then(response => {
        res
          .status(200)
          .json(response)
      })
      .catch(err => console.log(err))
  })

module.exports = router;