const express = require('express');
const mongoose = require('mongoose');

const server = express();

const setupMiddleware = require('./setup/middleware')(server);
const setupRoutes = require('./setup/routes')(server);

mongoose
  .connect('mongodb://localhost/notes')
  .then(cnn => {
    console.log('\n=== connected to mongo ===\n');
  })
  .catch(err => {
    console.log('\n=== ERROR connecting to Mongo ===\n');
  });

server.listen(5000, () => console.log('\n=== API on port 5000 ===\n'));
