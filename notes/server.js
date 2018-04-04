const express = require('express');
const mongoose = require('mongoose');

const Note = require('./src/models/notes-model');

const PORT = 5000;
const server = express();

server.use(express.json());

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/notes');

server.get('/', (req, res) => {
  Note.find({}, (err, notes) => {
    if (err) {
      res.status(500);
      res.json(err);
    } else {
      res.json(notes);
    }
  });
});

server.listen(PORT, err => {
  if (err) {
    console.error('Server error, not connecting', err);
  } else {
    console.log(`The server is listening on port number: ${PORT}.`);
  }
});