const express = require('express');
const session = require('express-session');

const Note = require('./notes/src/models/note-model');
const User = require('./notes/src/models/user-model');

const PORT = 5000;
const server = express();

const STATUS_USER_ERROR = 422;

server.use(express.json());
server.use(session({
  secret: 'e5SPiqsEtjexkTj3Xqovsjzq8ovjfgVDFMfUzSmJO21dtXs4re',
  resave: true,
  saveUninitialized: false,
}));

// middleware to check if user is logged in
const auth = (req, res, next) => {
  if (req.session.username) {
    User
      .findOne({ username: req.session.username })
      .then((user) => {
        req.user = user;
        next();
      })
      .catch((err) => {
        console.error('error logging in', err);
      });
  } else {
    res.status(STATUS_USER_ERROR).send({ errorMessage: 'You are not logged in' });
  }
};

// get all notes
server.get('/notes', auth, (req, res) => {
  Note.find()
    .then((notes) => res.status(200).json(notes))
    .catch((err) => {
      res.status(500).json({ errorMessage: 'There was an error getting the notes' });
    });
});

// get specific note
server.get('/notes/:id', (req, res) => {
  const { id } = req.params;
  Note.findById(id, (err, note) => {
    if (err) return console.error(err);
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

// delete note
server.delete('/notes/:id', (req, res) => {
  const { id } = req.params;
  Note
    .findByIdAndRemove(id, (err, deletedNote) => {
      if (err) console.error(err);
      res.status(200).json({ message: 'note deleted!', deletedNote });
    });
});

// create user
server.post('/users', (req, res) => {
  const userInfo = req.body;
  const user = new User(userInfo);
  user
    .save()
    .then((savedUser) => {
      res.status(200).json(savedUser);
    })
    .catch((err) => {
      res.status(500).json({ errorMessage: 'There was an error saving the user' });
    });
});

// login user
server.post('/login', (req, res) => {
  const username = req.body.username.toLowerCase();
  const potentialPW = req.body.password;

  if (!username || !potentialPW) {
    res.json({ errorMessage: 'username and password required' });
  }

  User
    .findOne({ username })
    .then((foundUser) => {
      foundUser.checkPassword(potentialPW, (err, isMatch) => {
        if (isMatch) {
          req.session.username = username;
          res.status(200).json({ success: true, user: req.session.username });
        } else {
          res.status(500).json({ success: false });
        }
      });
    })
    .catch((err) => {
      res
        .status(500)
        .json({ errorMessage: 'There was an error logging in' });
    });
});

server.listen(PORT, err => {
  if (err) {
    console.error('Server error, not connecting', err);
  } else {
    console.log(`The server is listening on port number: ${PORT}.`);
  }
});
