const express = require('express');
const router = express.Router();
const db = require('../data/helpers/allDb');

const table = 'notes';

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