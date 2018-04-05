const express = require('express');
const session = require('express-session');
const bcrypt = require('bcrypt');

const Note = require('./src/models/note-model');

const PORT = 5000;
const server = express();

server.use(express.json());
server.use(session({
  secret: 'e5SPiqsEtjexkTj3Xqovsjzq8ovjfgVDFMfUzSmJO21dtXs4re',
  resave: true,
  saveUninitialized: false,
}));

// get all notes
server.get('/notes', (req, res) => {
  Note.find({}, (err, notes) => {
    if (err) {
      res.status(500);
      res.json(err);
    } else {
      res.json(notes);
    }
  });
});

// get specific note
server.get('/notes/:id', (req, res) => {
  const { id } = req.params;
  Note.findById(id, (err, note) => {
    if (err) console.error(err);
    res.status(200).json({ message: 'here is your note!', note });
  });
});

// add note
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

// udpate note
server.post('/notes/:id', (req, res) => {
  const { id } = req.params;
  const updatedNoteInfo = req.body;
  Note
    .findByIdAndUpdate(id, updatedNoteInfo, { new: true }, (err, updatedNote) => {
      if (err) console.error(err);
      res.status(200).json({ message: 'note has been updated!', updatedNote });
    });
});

//delete note
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
