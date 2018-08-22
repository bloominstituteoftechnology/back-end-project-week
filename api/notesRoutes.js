const express = require('express');
const router = express.Router();
const db = require('../data/helpers/allDb');

const notes = 'notes';
const tags = 'tags';

router.get('/', (req, res, next) => {
  db
    .get(notes)
    .then(response => {
      let fetched = response;
      fetched.forEach(note => {
        db
          .getTagsByNote(tags, note.id)
          .then(response => {
            let tags = response;
            note = { ...note, tags };
            console.log(note);
          })
          .catch(err => console.log(err))
      })
      res
        .status(200)
        .json(fetched);
    })
    .catch(err => console.log(err));
})

router.get('/:id', (req, res, next) => {
  const id = req.params.id;
  db
    .getById(notes, id)
    .then(response => {
      const note = { ...response };
      db
        .getTagsByNote(tags, id)
        .then(response => {
          res
            .status(200)
            .json({ ...note, tags: response })
        })
        .catch(err => console.log(err))
    })
    .catch(err => console.log(err))
})

router.post('/', (req, res, next) => {
  const note = req.body;
  db
    .add(notes, note)
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
    .edit(notes, id, note)
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
    .delete(notes, id)
    .then(response => {
      res
        .status(200)
        .json(response)
    })
    .catch(err => console.log(err))
})

module.exports = router;