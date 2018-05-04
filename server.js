const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const mongoose = require('mongoose');
const cors = require('cors');

// Server
const server = express();

// Imports

const Note = require('./NotesSchema');

// Logger
// const logger = (req, res, next) => {
//   console.log('d-(OvO")z looks correct to me', req.body);

//   next();
// };

// Middelware
server.use(express.json());
server.use(morgan());
server.use(helmet());
server.use(cors());
// server.use(logger);

// Server Code
server.get('/', (req, res) => {
  // API Check
  res.json({ api: 'Running..' });
});

server.get('/api/notes', (req, res) => {
  Note.find({})
    .then(notes => {
      res.json(notes);
    })
    .catch(err => {
      res.status(500).json({ error: 'Note does not exist' });
    });
});

server.post('/api/notes', (req, res) => {
  const { title, body } = req.body;
  const newNote = new Note({ title, body });
  newNote
    .save()
    .then(savedNote => {
      res.json(savedNote);
    })
    .catch(err => {
      res.status(422).json(err);
    });
});

// Delete does not work right now.

// server.delete('/api/notes/:id', (req, res) => {
//   const { id } = req.params;
//   let notes;

//   Note.findById(id)
//     .then(response => {
//       user = { ...response[0] };

//       Note.remove(id)
//         .then(response => {
//           res.status(200).json(notes);
//         })
//         .catch(error => {
//           res.status(500).json(error);
//         });
//     })
//     .catch(error => {
//       res.status(500).json(error);
//     });
// });

module.exports = server;
