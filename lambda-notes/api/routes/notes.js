var express = require('express');
var router = express.Router();
const Note = require('../models/note');

router.get('/', function(req, res, next) {
  Note.find({})
  .then(notes => {
    res.json(notes);
  });
});

router.post('/save', function(req, res) {
  console.log(req.body.newNote);
  const newNote = new Note(req.body.newNote);
  newNote.save()
  .then((newNote) => {
    res.status(200).json(newNote);
  })
  .catch((err) => {
    res.status(500).json({ error: 'There was a server error while adding note', err });
  });
});

module.exports = router;
