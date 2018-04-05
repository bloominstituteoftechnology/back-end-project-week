const mongoose = require('mongoose');
const helmet = require('helmet');
const express = require('express');
const cors = require('cors');
const User = require('./Models/UserModel');

const PORT = 5000;
const STATUS_SUCCESS = 200;
const STATUS_USER_ERROR = 422;
const server = express();
const corsOptions = {
  origin: `http://localhost:3000`,
  credentials: true,
  methods: ['GET', 'POST']
};

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

  User.find({ username })
    .then(user => {
      user.checkPassword(password, (noMatch, hashMatch) => {
        if (noMatch !== null) {
          res.status(422).json({ error: 'passwords dont match' });
          return;
        }
        if (hashMatch) {
          let id = user[0]._id;
          res.status(200).send({ success: 'User info Found.', id });
        }
      });
    })
    .catch(err => {
      res.status(500).send(err);
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
