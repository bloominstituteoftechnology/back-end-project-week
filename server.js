const mongoose = require('mongoose');
const helmet = require('helmet');
const express = require('express');
const cors = require('cors');
const User = require('./Models/UserModel');
const Note = require('./Models/NoteModel');

const PORT = 5000;
const STATUS_SUCCESS = 200;
const STATUS_USER_ERROR = 422;
const server = express();
const corsOptions = {
  origin: `http://localhost:3000`,
  credentials: true,
  methods: ['GET', 'POST']
};
let currentUser = null;

server.use(cors(corsOptions));
server.use(express.json());
server.use(helmet());

server.post('/signup', (req, res) => {
  const { body } = req;
  User.create(body)
    .then(newUser => {
      res
        .status(201)
        .send({ success: 'Your user info has been saved.', newUser });
    })
    .catch(err => {
      res.status(500).send({ failed: 'Failed to save your info.', err });
    });
});

server.post('/login', (req, res) => {
  const { username, password } = req.body;
  User.findOne({ username })
    .then(user => {
      let id = user._id;
      user
        .checkPassword(password)
        .then(result => {
          if (result) {
            currentUser = id;
            return res.status(200).send({ success: 'User logged in.', id });
          }
          return res.status(422).send({ failed: 'Password did not match.' });
        })
        .catch(err => {
          res.status(500).send({ failed: 'Error Checking Password' });
        });
    })
    .catch(err => {
      res.status(500).send({ failed: 'Error Finding Username.' });
    });
});

server.post('/notes', (req, res) => {
  const { body } = req;
  console.log(body);
  Note.create(body)
    .then(note => {
      res.status(201).send({ success: 'Note Saved', note });
    })
    .catch(err => {
      res.status(500).send({ failed: 'Failed to save note', err });
    });
});

server.get('/notes', (req, res) => {
  if (currentUser === null) {
    res
      .status(422)
      .send({ failed: 'Not Logged in, cannot retrieve your notes' });
  }
  Note.find({ author: currentUser })
    .then(notes => {
      res.status(201).send({ success: 'Found users Notes', notes });
    })
    .catch(err => {
      res.status(500).send({ failed: 'Error Finding notes', err });
    });
});

server.listen(PORT, () => {
  console.log(`Server up an running on Port: ${PORT}`);
});
mongoose
  .connect('mongodb://localhost/Notes')
  .then(pass => {
    console.log('Connected to Mongo');
  })
  .catch(fail => {
    console.log('Oops, failed to connect to Mongo.');
  });
