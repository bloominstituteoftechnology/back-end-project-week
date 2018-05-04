const express = require('express');

//schema
const Note = require('./Note.js');

const router = express.Router();

router
  .route('/:id')
  .get((req, res) => {
    const { id } = req.params;
    Note.findById(id)
      .then(response => {
        res.json(response);
      })
      .catch(err => {
        res.status(500).json(err);
      });
  })
  .delete((req, res) => {
    const { id } = req.params;
    Note.findByIdAndRemove(id)
      .then(response => {
        res.json(response);
      })
      .catch(err => {
        res.status(500).json(err);
      });
  })

module.exports = router;