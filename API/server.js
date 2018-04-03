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

server.get('/', (req, res) => {
  res.status(200).json({ status: 'API running' });
});

server.post('/', (req, res) => {
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
