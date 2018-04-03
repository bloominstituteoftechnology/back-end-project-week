const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const port = process.env.PORT || 3030;

const Note = require('./api/models/NoteSchema');
const User = require('./api/models/UserSchema');

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

server.get('/notes/:id', (req, res) => {
  Note.findById(req.params.id)
    .then(note => res.status(200).json(note))
    .catch(err =>
      res
        .status(500)
        .json({ msg: 'There was an error retrieving the note.', error: err })
    );
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

server.post('/register', (req, res) => {
  const newUser = req.body;
  if (!newUser.username || !newUser.password) {
    res
      .status(400)
      .json({ msg: 'Please provide a username and a password.', error: err });
  }
  const user = new User(newUser);
  user
    .save()
    .then(savedUser => {
      res.status(200).json(savedUser);
    })
    .catch(err => {
      res
        .status(500)
        .json({ msg: 'There was an error saving the user.', error: err });
    });
});

server.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    res
      .status(400)
      .json({
        msg: 'Please enter both a username and a password.',
        error: err,
      });
  }
  User.findOne({ username }).then(foundUser => {
    if (!foundUser) res.status(404).json({ msg: 'User does not exist' });
    foundUser
      .checkPassword(password, res)
      .then(isValid => {
        if (isValid) res.json(foundUser);
        else res.json({ msg: 'Incorrect username or password' });
      })
      .catch(err => res.error(err));
  });
});

server.listen(port, () => console.log(`Server is listening on port ${port}`));
