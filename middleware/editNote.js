const express = require('express');
const router = express.Router();
const db = require('../data/dbConfig');

router.put('/', (req, res) => {
  const note = req.body;
  if (note.title.length && note.content.length !== 0) {
    console.log(note);
  }
})

module.exports = router;