const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');
const cors = require('cors');
const User = require('./Schemas/user');

const server = express();

mongoose
  .connect('mongodb://localhost/notes')
  .then(() => console.log('API connected...MongoDB connected...'))
  .catch(() => console.log('Connection to API failed'));

server.use(express.json());
server.use(helmet());
server.use(cors());

server.post('/login', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({ errorMessage: 'Please provide an email and password in the request body' });
  }
  User.findOne({ email })
    .then((user) => {
      user.checkPassword(password, (err, matched) => {
        if (err) {
          res.status(422).json({ error: 'passwords dont match' });
          return;
        }
        if (matched) {
          res.status(201).json(user);
        }
      });
    })
    .catch((err) => {
      if (err) {
        res.status(400).json({ errorMessage: 'there was a user error', errorBody: err });
      }
      res.status(500).json({ errorMessage: 'There was an internal error while saving the user to the database', err });
    });
});

server.post('/register', (req, res) => {
  const userInfo = req.body;
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({ errorMessage: 'Please provide an email and password in the request body' });
  }
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
        res.status(400).json({ errorMessage: 'there was a user error', errorBody: err });
      }
      res.status(500).json({ errorMessage: 'There was an internal error while saving the user to the database', err });
    });
});

const port = process.env.PORT || 5000;
server.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
