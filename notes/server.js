const express = require('express');
const mongoose = require('mongoose');

const Note = require('./src/models/notes-model');

const PORT = 5000;
const server = express();

server.use(express.json());

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/notes');

server.get('/', (req, res) => {
  Note.find({}, (err, notes) => {
    if (err) {
      res.status(500);
      res.json(err);
    } else {
      res.json(notes);
    }
  });
});

server.get('/notes/:id', (req, res) => {
  const { id } = req.params;
  Note.findById(id, (err, note) => {
    if (err) console.error(err);
    res.status(200).json({ message: 'here is your note!', note });
  });
});

server.post('/notes', (req, res) => {
  const noteInfo = req.body;
  const note = new Note(noteInfo);
  note
    .save()
    .then((savedNote) => {
      res.status(200).json(savedNote);
    })
    .catch((err) => {
      res.status(500).json({ errorMessage: 'There was an error saving the note' });
    });
});

server.post('/notes/:id', (req, res) => {
  const { id } = req.params;
  const updatedNoteInfo = req.body;
  Note
    .findByIdAndUpdate(id, updatedNoteInfo, { new: true }, (err, updatedNote) => {
      if (err) console.error(err);
      res.status(200).send(`note has been updated! ${updatedNote}`);
    });
});

server.delete('/notes/:id', (req, res) => {
  const { id } = req.params;
  Note
    .findByIdAndRemove(id, (err, deletedNote) => {
      if (err) console.error(err);
      res.status(200).json({ message: 'note deleted!', deletedNote });
    });
});

server.listen(PORT, err => {
  if (err) {
    console.error('Server error, not connecting', err);
  } else {
    console.log(`The server is listening on port number: ${PORT}.`);
  }
});