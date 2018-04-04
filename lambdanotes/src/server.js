const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const Note = require('./notes/NoteSchema');
const router = require('./notes/NoteRoutes');

const Schema = mongoose.Schema;
const PORT = 5555;
const server = express();

server.use(express.json());
server.use(helmet());
server.use('/notes/NoteRoutes', router);

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
    console.log(`Connected to server on port ${PORT}`);
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

module.exports = server;
