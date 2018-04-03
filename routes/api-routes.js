const express = require('express');
const server = express();

const Note = require('../models/notes-model');

server.use(express.json());

server.post('/note/create', (req, res) => {
  const { noteTitle, noteBody } = req.body;
  if (noteTitle && noteBody) {
    const note = new Note(req.body);
    note
      .save()
      .then((note) => res.json(note))
      .catch((err) => {
        // console.log(err);
        res.status(500).json(err);
      });
  } else {
    res
      .status(400)
      .json({ error: 'Please provide both a title and note body.' });
  }
});

server.get('/notes', (req, res) => {
  Note.find({})
    .then((notes) => {
      if (notes) {
        res.status(200).json(notes);
      } else res.status(404).json({ message: 'No notes found.' });
    })
    .catch((err) => res.status(400).json(err));
});

server.get('/note/:id', (req, res) => {
  Note.findById(req.params.id)
    .then((note) => {
      if (note) {
        res.status(200).json(note);
      } else res.status(404).json({ message: 'No note with that id.' });
    })
    .catch((err) => res.status(400).json(err));
});

server.put('/note', (req, res) => {
  const { noteTitle, noteBody, id } = req.body;
  if (id && (noteTitle || noteBody)) {
    const updatedNote = {
      noteTitle,
      noteBody,
    };
    Note.findByIdAndUpdate(id, updatedNote)
      .then((note) => {
        if (note) {
          Note.findById(note.id)
            .then((note) => {
              res.status(200).json(note);
            })
            .catch((err) => res.status(500).json(err));
        } else res.status(404).json({ message: 'No note with that id.' });
      })
      .catch((err) => res.status(500).json(err));
  } else
    res.status(400).json({ error: 'Please provide an ID and Title or Body.' });
});

server.delete('/note', (req, res) => {
  const { id } = req.body.id;
  Note.findByIdAndRemove(id)
    .then(note => res.status(200).json(note))
    .catch(err => res.status(500).json(err));
});

module.exports = server;
