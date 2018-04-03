const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const port = process.env.PORT || 3030;
const session = require('express-session');

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
server.use(
  session({
    secret: 'rigby is a bird',
    resave: false,
    saveUninitialized: true,
    auth: false,
  })
);

const RequireAuthMW = (req, res, next) => {
  const session = req.session;
  if (session.username) {
    next();
  } else {
    res.status(400).json({ error: 'Not logged in' });
  }
};

server.get('/notes', RequireAuthMW, (req, res) => {
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

server.get('/notes/:id', RequireAuthMW, (req, res) => {
  Note.findById(req.params.id)
    .then(note => res.status(200).json(note))
    .catch(err =>
      res
        .status(500)
        .json({ msg: 'There was an error retrieving the note.', error: err })
    );
});

server.post('/notes', RequireAuthMW, (req, res) => {
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

server.put('/notes', RequireAuthMW, (req, res) => {
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

server.delete('/notes', RequireAuthMW, (req, res) => {
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
  const session = req.session;
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(400).json({
      msg: 'Please enter both a username and a password.',
      error: err,
    });
  }
  User.findOne({ username })
    .populate('notes')
    .then(foundUser => {
      if (!foundUser) res.status(404).json({ msg: 'User does not exist' });
      foundUser
        .checkPassword(password, res)
        .then(isValid => {
          if (isValid) {
            session.username = username;
            res
              .status(200)
              .json({ username: foundUser.username, notes: foundUser.notes, id: foundUser._id });
          } else
            res.status(400).json({ msg: 'Incorrect username or password' });
        })
        .catch(err => res.error(err));
    });
});

server.post('/logout', (req, res) => {
  delete req.session.username;
  res.status(200).json({ msg: 'Logged out.' });
});

server.listen(port, () => console.log(`Server is listening on port ${port}`));
