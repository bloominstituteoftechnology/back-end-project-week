const express = require('express');
const router = express.Router();
const Note = require('./Note');

router.get('/', (req, res) => {
  Note.find()
    .then(notes => res.json(notes))
    .catch(err => res.status(500).json(err));
})

module.exports = router;