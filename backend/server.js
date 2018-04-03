/* eslint-disable no-console */
const express = require('express');
const cors = require('cors');
const Note = require('./models/NoteModel.js');
const User = require('./models/UserModel.js');

const server = express();
server.use(cors());
server.use(express.json());

// NOTES ENDPOINTS //
// Get all notes
server.get('/notes', (req, res) => {
  Note.find({}, (err, notes) => {
    if (err) res.status(500).json('Failed to get notes: ', err);
    res.status(200).json(notes);
  });
});

// Get note by ID
server.get('/notes/:id', (req, res) => {
  const id = req.params.id;
  Note.findById(id)
    .then(note => {
      res.status(200).json(note);
    })
    .catch(err => {
      res.status(500).json({ message: 'Cannot find note', error: err });
    });
});

// Save new note
server.post('/notes', (req, res) => {
  const { title, content, createdBy } = req.body;
  if (!title || !content) {
    res.json({ message: 'You need to enter a title and content!' });
    return;
  }
  const newNote = new Note({ title, content, createdBy });
  newNote
    .save()
    .then(savedNote => {
      res.status(200).json(savedNote);
      return savedNote;
    })
    .then(savedNote => {
      const userId = savedNote.createdBy; // Adds id of new note to users object
      const savedNoteId = savedNote.id;
      User.findByIdAndUpdate(
        userId,
        { $push: { notes: [savedNoteId] } },
        err => {
          if (err) console.log(err);
        }
      );
    })
    .catch(err =>
      res.status(500).json({ message: 'Error saving note: ', error: err })
    );
});

// USER ENDPOINTS //
// Create new User
server.post('/users', (req, res) => {
  let { username, password } = req.body;
  username = username.toLowerCase();
  if (!username || !password) {
    res
      .status(422)
      .json({ message: 'You need to provide a username and password!' });
    return;
  }
  const newUser = new User({ username, password });
  newUser
    .save()
    .then(savedUser =>
      res.status(200).json({ message: 'Successfully created!', savedUser })
    );
});

// Get all users
server.get('/users', (req, res) => {
  User.find({})
    .populate('notes')
    .then(users => res.status(200).json(users))
    .catch(err =>
      res.status(500).json({ message: 'Error getting users', error: err })
    );
});

// Get user by id
server.get('/users/:id', (req, res) => {
  const id = req.params.id;
  User.findById(id)
    .populate('notes')
    .exec((err, user) => {
      if (err) res.status(500).json({ message: 'Error find user', error: err });
      res.status(200).json(user);
    });
});

server.get('/test', (req, res) => {
  res.status(200);
  res.send('Bada Bing Bada Boom!');
});

module.exports = server;
