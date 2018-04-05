const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const { mySecret } = require('./config');
const { authenticate } = require('./authenticate');
const User = require('./Schemas/user');
const Note = require('./Schemas/note');

const server = express();

mongoose
  .connect('mongodb://localhost/backend')
  .then(() => console.log('API connected...MongoDB connected...'))
  .catch(() => console.log('Connection to API failed'));

server.use(express.json());
server.use(helmet());
server.use(cors());

server.delete('/deletenote', authenticate, (req, res) => {
  const id = req.get('id');
  Note.findByIdAndRemove(id)
    .then((deletedNote) => {
      res.status(200).json(deletedNote);
    })
    .catch((err) => {
      res.status(500).json({ errorMessage: 'There was an internal error while the note was deleting' });
    });
});

server.get('/getnotes', authenticate, (req, res) => {
  const { email } = req.jwtObj;
  Note.find({ email })
    .then((notes) => {
      res.status(200).json({ notes });
    })
    .catch((err) => {
      res.status(500).json({ errorMessage: 'There was an internal error while retrieving notes', errorBody: err });
    });
});

server.post('/login', (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email })
    .then((user) => {
      user.checkPassword(password, (err, matched) => {
        if (matched === false) {
          res.status(400).json({ errorMessage: 'The email and password do not match', errorBody: 'n/a' });
        }
        if (matched === true) {
          const payload = {
            email: user.email,
          };
          const token = jwt.sign(payload, mySecret);
          res.status(201).json({ token });
        }
      });
    })
    .catch((err) => {
      res.status(400).json({ errorMessage: 'The email entered was not found in the system', errorBody: err });
    });
});

server.post('/newnote', authenticate, (req, res) => {
  const noteInfo = req.body;
  const { email } = req.jwtObj;
  const note = new Note({
    ...noteInfo, email,
  });
  note.save()
    .then((newNote) => {
      res.status(201).json(newNote);
    })
    .catch((err) => {
      res.status(500).json({ errorMessage: 'There was an internal error while updating the note', errorBody: err });
    });
});

server.post('/register', (req, res) => {
  const userInfo = req.body;
  const { email, password } = req.body;
  const user = new User({
    email,
    password,
  });
  user.save()
    .then((newUser) => {
      res.status(201).json(newUser);
    })
    .catch((err) => {
      if (err) {
        res.status(400).json({ errorMessage: 'The email already exists, try another email', errorBody: err });
      }
    });
});

server.put('/updatenote', authenticate, (req, res) => {
  const changes = req.body;
  const { id, title, body } = changes;
  if (!title || !body || !id) {
    res.status(400).json({ errorMessage: 'Incomplete information provided for update' });
  }
  Note.findByIdAndUpdate(id, changes, { new: true, runValidators: true })
    .then((alteredNote) => {
      if (alteredNote === null) {
        res.status(404).json({ errorMessage: 'The note with the specified ID was not found' });
      }
      res.status(200).json(alteredNote);
    })
    .catch((err) => {
      res.status(500).json({ errorMessage: 'There was an internal error while updating the note', err });
    });
});

const port = process.env.PORT || 5000;
server.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
