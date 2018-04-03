const express = require('express');
const Note = require('./noteModel.js');
const noteRouter = express.Router();

noteRouter.post('/', (req, res) => {
  const info = req.body;
  const note = new Note(info);

  note
    .save()
    .then(savedNote => {
      res
        .status(200)
        .json(savedNote);
    })
    .catch(err => {
      res
        .status(500)
        .json({ MESSAGE: 'Note saving error', error: err });
    });
});

module.exports = noteRouter;
