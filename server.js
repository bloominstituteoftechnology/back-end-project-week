const express = require('express');
const mongoose = require('mongoose');

const noteSchema = require('./schema');

const PORT = 5000;
const server = express();

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/noteSchema');

server.get('/', (req, res) => {
  Schema.find({}, (err, database) => {
    if (err) {
      res.status(500);
      res.json(err);
    } else {
      res.json(database);
    }
  });
});

server.listen(PORT, err => {
  if (err) {
    console.log('Server error', err);
  } else {
    console.log(`The server is listening on port: ${PORT}.`);
  }
});