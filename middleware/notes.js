const express = require('express');
const router = express.Router();
const db = require('../data/dbConfig');

router.get('/', (req, res) => {
  db.find()
    .then( notes => {
      res
        .status(200)
        .json(notes);
    })
    .catch(err => {
      res
        .status(500)
        .json({
          error: "The notes could not be retrieved!",
          err
        })
    })
})

router.get('/:id', (req, res) => {
  const id = req.params.id;
  db
    .findById(id)
    .then(note => {
      console.log(note);
      if (note.length > 0) {
        console.log('note exists')
        res
          .status(200)
          .json(note)
      } else {
        res
          .status(404)
          .json({
            errorMessage: "The note with the specified ID doesn't exist",
          })
      }
    })
    .catch(error => {
      res
        .status(500)
        .json({
          errorMessage: "The note could not be retrieved",
          error
        })
    })
})

module.exports = router;