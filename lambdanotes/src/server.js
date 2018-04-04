const express = require('express');
const mongoose = require('mongoose');
const Note = require('./models/noteSchema');

const Schema = mongoose.Schema;
const PORT = 5555;
const server = express();

server.use(express.json());

mongoose.Promise = global.Promise;

mongoose
  .connect('mongodb://localhost/NoteSchema')
  .then(res => {
    console.log('Successfully connected to MongoDB');
  })
  .catch(err => {
    console.log('Database connection failed. Error: ', err);
  });

server.listen(PORT, err => {
  if (err) {
    console.log(`Error connecting to port ${PORT}`);
  } else {
    console.log('Server connected!');
  }
});

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
