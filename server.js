// require express body-parser and mongoose
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Schema = require('./schema');

const PORT = 5000;
const server = express();

server.use(bodyParser.json());

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/demoSchema');

server.get('/', (request, response) => {
  Schema.find({}, (err, database) => {
    if(err) {
      response.status(500);
      response.json(err);
    }else {
      response.json(database);
    }
  });
});

server.listen(PORT, err => {
  if(err) {
    console.log('Something is not right in the world.', err);
  } else {
    console.log(`The server is listening on port number: ${PORT}.`);
  }
});
