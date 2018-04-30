const router = require('express').Router();

const Note = require('./noteModel');

router
  .route('/')

  .post((req, res) => {
    const note = new Note(req.body);
    const { title, content } = req.body;

    note
      .save()
      .then(savedNote => {
        res.status(201).json({ savedNote });
      })
      .catch(err => {
        res.status(500).json(err);
      });
  });

module.exports = router;
