const express = require('express');
const Note = require('./noteModel.js');
const noteRouter = express.Router();

noteRouter.post('/', (req, res) => {
  const info = req.body;
  console.log('info test', info);
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

noteRouter.delete('/', (req, res) => {
  const info = req.body;
  console.log('delete info', info.id);
  Note
    .findByIdAndRemove(info.id)
      .then(note => {
        res
          .status(200)
          .json({ message: "Note deleted successfully!" })
      })
      .catch(err => {
        res
          .status(500)
          .json(err)
      })
})

noteRouter.put('/', (req, res) => {
  const info = req.body;
  const updateNote = {
    title: info.title,
    content: info.meat
  }
  console.log('editing: ', req.body);
  Note
    .findByIdAndUpdate(info.id, updateNote)
      .then(note => {
        res
          .status(200)
          .json({ message: "Note was edited successfully!" });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err });
      });
})

module.exports = noteRouter;
