const express = require('express');
const Note = require('./noteSchema');

const noteRouter = express();

noteRouter.get('/', (req, res) => {
  const { userId } = req.decoded;
  console.log('decoded: ', userId);
  Note.find()
    .where({ userId })
    .then(notes => {
      res.status(200).json(notes);
    })
    .catch(err => {
      res.status(500).json({ err: 'cannot get notes' });
    });
});

noteRouter.post('/', (req, res) => {
  const { title, text, userId } = req.body;
  const note = new Note(req.body);
  note
    .save()
    .then(note => {
      Note.find({ userId })
        .then(notes => {
          res.status(200).json(notes);
        })
        .catch(err => {
          res.send(err);
        });
    })
    .catch(err => {
      res.status(500).json({ Error: err });
    });
});

noteRouter.get('/:id', (req, res) => {
  const { id } = req.params;
  Note.find({ _id: id })
    .then(note => {
      res.status(200).json(note);
    })
    .catch(err => {
      res.status(500).json({ err });
    });
});

module.exports = noteRouter;
