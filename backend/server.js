/* eslint-disable no-console */
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const Note = require('./models/NoteModel.js');
const User = require('./models/UserModel.js');
const authenticate = require('./middleware/authenticate');
const { secret } = require('./config');

const server = express();
server.use(cors());
server.use(express.json());

// NOTES ENDPOINTS //
server.get('/notes', authenticate, (req, res) => {
  Note.find({}, (err, notes) => {
    console.log(notes)
    if (err) res.status(500).json('Failed to get notes: ', err);
    res.status(200).json(notes);
  });
});
// Save new note
server.post('/notes', authenticate, (req, res) => {
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

// Get Note by ID
server.get('/notes/:id', authenticate, (req, res) => {
  const id = req.params.id;
  Note.findById(id)
    .populate('createdBy')
    .then(note => {
      res.status(200).json(note);
    })
    .catch(err => {
      res.status(500).json({ message: 'Cannot find note', error: err });
    });
});
// Update Note by ID
server.put('/notes/:id', authenticate, (req, res) => {
  const id = req.params.id;
  const update = req.body;
  Note.findByIdAndUpdate(id, update, { new: true })
    .then(note => {
      res.status(200).json({
        message: 'Note updated successfully!',
        updatedNote: note
      });
    })
    .catch(err =>
      res.status(500).json({ message: 'Error finding note', error: err })
    );
});
// Delete note
server.delete('/notes/:id', authenticate, (req, res) => {
  const id = req.params.id;
  Note.findByIdAndRemove(id)
    .then(note => {
      res.status(200).json({
        message: 'Note deleted successfully!',
        deletedNote: note
      });
    })
    .catch(err =>
      res.status(500).json({ message: 'Error Deleting note', error: err })
    );
});

// USER ENDPOINTS //
// Create new User
server
  .route('/users')
  // Create new User
  .post((req, res) => {
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
  })
  // Get all Users
  .get((req, res) => {
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

// Login user and send back JWT
server.post('/login', (req, res) => {
  let { username, password } = req.body;
  username = username.toLowerCase();
  if (!username || !password) {
    res
      .status(422)
      .json({ error: 'You need to provide a username and password' });
  }
  // Find the user object matching the username
  User.findOne({ username }, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid Username/Password' });
    }
    if (user === null) {
      res.status(422).json({ error: 'User does not exist' });
      return;
    }
    // Use the method on the User model to hash and check PW
    user.checkPassword(password, (nonMatch, hashMatch) => {
      // console.log(nonMatch, password);
      if (nonMatch !== null) {
        res.status(422).json({ error: 'Incorrect password' });
        return;
      }
      if (hashMatch) {
        const payload = {
          username: user.username
        };
        const token = jwt.sign(payload, secret);
        res.json({ token });
      }
    });
  });
});

module.exports = server;
