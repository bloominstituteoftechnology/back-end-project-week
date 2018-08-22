const express = require('express');
const router = express.Router();
const db = require('../data/helpers/allDb');

const tags = 'tags';

router.get('/', (req, res, next) => {
  db
    .get(tags)
    .then(response => {
      res
        .status(200)
        .json(response)
    })
    .catch(err => console.log(err));
})

router.get('/:id', (req, res, next) => {
  const id = Number(req.params.id);
  db
    .getById(tags, id)
    .then(response => {
      res
        .status(200)
        .json(response)
    })
    .catch(err => console.log(err))
})

router.post('/', (req, res, next) => {
  const tag = req.body;
  db
    .add(tags, tag)
    .then(response => {
      res
        .status(200)
        .json(response)
    })
    .catch(err => console.log(err));
})

router.put('/:id', (req, res, next) => {
  const id = Number(req.params.id);
  const tag = req.body;
  db
    .edit(tags, id, tag)
    .then(response => {
      res
        .status(200)
        .json(response)
    })
    .catch(err => console.log(err))
})

router.delete('/:id', (req, res, next) => {
  const id = Number(req.params.id);
  db
    .delete(tags, id)
    .then(response => {
      res
        .status(200)
        .json(response)
    })
    .catch(err => console.log(err))
})

module.exports = router;