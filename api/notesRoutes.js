const express = require('express');
const router = express.Router();
const db = require('../data/helpers/allDb');

const notes = 'notes';

router.get('/', (req, res, next) => {
  let allNotes = [];
  db
    .get(notes)
    .then(response => {
      let fetched = response;
      fetched.forEach(note => {
        let singleNote = { ...note, tags: [] }
        db
          .getTagsByNote('tags', note.id)
          .then(response => {
            singleNote.tags = response;
            console.log(singleNote);
          })
          .catch(err => console.log(err))
          allNotes = [ ...allNotes, singleNote ];
      })
      res
        .status(200)
        .json(allNotes);
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
        .getTagsByNote('tags', id)
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