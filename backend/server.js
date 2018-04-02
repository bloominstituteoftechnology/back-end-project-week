/* eslint-disable no-console */
const express = require('express');
const mongoose = require('mongoose');
const Note = require('./models/NoteModel.js');
const User = require('./models/UserModel.js');
const server = express();

server.use(express.json());
const PORT = process.env.PORT || 5000;

mongoose
  .connect('mongodb://localhost/lambdanotes')
  .then(() => console.log('Successfully connected to MongoDB!'))
  .catch(err => console.error('Failed to connect to MongoDB!', err));

// Notes endpoints
server.get('/notes', (req, res) => {
  Note.find({}, (err, notes) => {
    if (err) res.status(500).json('Failed to get notes: ', err);
    res.status(200).json(notes);
  });
});

server.post('/notes', (req, res) => {
  const { title, content, createdBy } = req.body;
  if (!title || !content)
    res.status(422).json('You need to enter a title and content!');
  const newNote = new Note({ title, content, createdBy });
  newNote
    .save()
    .then(savedNote => res.status(200).json(savedNote))
    .catch(err => res.status(500).json('Error saving note: ', err));
});

// User endpoints
server.post('/users', (req, res) => {
  console.log(req.body)
  let { username, password } = req.body;
  username = username.toLowerCase();
  if (!username || !password)
    res.status(422).json('You need to provide a username and password!');
  const newUser = new User({ username, password });
  newUser
    .save()
    .then(savedUser =>
      res.status(200).json({ message: 'Successfully created!', savedUser })
    );
});

server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
