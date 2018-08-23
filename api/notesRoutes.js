const express = require('express');
const router = express.Router();
const db = require('../data/helpers/allDb');

// GET (Postman Test: OK)
router.get('/', (req, res, next) => {
  db
    .get(table)
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
      .getById(table, id)
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
        .add(table, note)
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
      .editNote(table, id, note)
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
      .delete(table, id)
      .then(response => {
        res
          .status(200)
          .json(response)
      })
      .catch(err => console.log(err))
  })

module.exports = router;