const express = require('express');
const mongoose = require('mongoose');

const Note = require('./src/models/notes-model');

const PORT = 5000;
const server = express();

server.use(express.json());

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/noteSchema');

server.get('/', (request, response) => {
  Note.find({}, (err, database) => {
    if (err) {
      response.status(500);
      response.json(err);
    }else {
      response.json(database);
    }
  });
});

server.listen(PORT, err => {
  if (err) {
    console.log('Something is not right in the world.', err);
  } else {
    console.log(`The server is listening on port number: ${PORT}.`);
  }
});