const mongoose = require('mongoose');
const helmet = require('helmet');
const express = require('express');
const cors = require('cors');
const User = require('./Models/UserModel');

const server = express();
const PORT = 5000;
const STATUS_SUCCESS = 200;
const STATUS_USER_ERROR = 422;
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
