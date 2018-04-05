const express = require('express');
const server = express();

const Note = require('../models/notes-model');

server.use(express.json());

server.post('/note/create', (req, res) => {
  const { noteTitle, noteBody, username } = req.body;
  const newNote = {
    noteTitle,
    noteBody,
    username,
  };
  if (noteTitle && noteBody) {
    const note = new Note(req.body);
    note
      .save()
      .then((note) => {
        if (note) {
          Note.find({})
            .then((notes) => {
              if (notes) {  
                res.status(200).json(notes);
              } else res.status(404).json({ message: 'No notes found.' });
            })
            .catch((err) => res.status(400).json(err));
        } else res.status(500).json({ error: 'Unable to Save Note' });
      })
      .catch((err) => {
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

// server.get('/note/:id', isLoggedIn, (req, res) => {
//   Note.findById(req.params.id)
//     .then((note) => {
//       if (note) {
//         res.status(200).json(note);
//       } else res.status(404).json({ message: 'No note with that id.' });
//     })
//     .catch((err) => res.status(400).json(err));
// });

server.put('/note', (req, res) => {
  console.log(req.body);
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
              if (note) {
                Note.find({})
                  .then((notes) => {
                    if (notes) {
                      res.status(200).json(notes);
                    } else res.status(404).json({ message: 'No notes found.' });
                  })
                  .catch((err) => res.status(400).json(err));
              } else res.status(500).json({ error: 'Unable to Save Note' });
            })
            .catch((err) => res.status(500).json(err));
        } else res.status(404).json({ message: 'No note with that id.' });
      })
      .catch((err) => res.status(500).json(err));
  } else
    res.status(400).json({ error: 'Please provide an ID and Title or Body.' });
});

server.delete('/note/:id', (req, res) => {
  Note.findByIdAndRemove(req.params.id)
    .then((note) => {
        Note.find({})
          .then((notes) => {
            if (notes) {
              res.status(200).json(notes);
            } else res.status(404).json({ message: 'No notes found.' });
          })
          .catch((err) => res.status(400).json(err));
    })
    .catch((err) => res.status(500).json(err));
});

module.exports = server;
