const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const port = process.env.PORT || 3030;
const Note = require('./api/models/NoteSchema');

const corsOptions = {
  origin: `http://localhost:3000`,
  credentials: true,
};

const server = express();

mongoose
  .connect('mongodb://localhost/notes')
  .then(() => {
    console.log('Successfully connected to MongoDB');
  })
  .catch(err => {
    console.log('There was an error connecting to MongoDB', err);
  });

server.use(cors(corsOptions));
server.use(express.json());

server.get('/notes', (req, res) => {
  Note.find({})
    .then(notes => {
      res.status(200).json(notes);
    })
    .catch(err => {
      res
        .status(500)
        .json({ msg: 'There was an error retrieving the notes.', error: err });
    });
});

server.post('/notes', (req, res) => {
  const noteInfo = req.body;
  const note = new Note(noteInfo);
  note
    .save()
    .then(savedNote => {
      res.status(200).json(savedNote);
    })
    .catch(err => {
      res
        .status(500)
        .json({ msg: 'There was an error saving the note.', error: err });
    });
});

server.put('/notes', (req, res) => {
  const note = req.body;
  Note.findOneAndUpdate({ id: note.id }, note, { new: true })
    .then(updatedNote => {
      res.status(200).json(updatedNote);
    })
    .catch(err => {
      res
        .status(500)
        .json({ msg: 'There was an error updating the note.', error: err });
    });
});

server.delete('/notes', (req, res) => {
  const { id } = req.body;
  Note.findOneAndRemove({ id })
    .then(deletedNote => {
      res.status(200).json(deletedNote);
    })
    .catch(err => {
      res
        .status(500)
        .json({ msg: 'There was an error deleting the note.', error: err });
    });
});

server.listen(port, () => console.log(`Server is listening on port ${port}`));
