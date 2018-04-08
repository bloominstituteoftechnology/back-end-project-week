// require express body-parser and mongoose modules
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// require the schema.js file
const Schema = require('./schema');

const PORT = 5000;
const server = express();
server.use(bodyParser.json());

mongoose.Promise = global.Promise;
// This style will lead to an UnhandledPromiseRejectionWarning
// mongoose.connect('mongodb://localhost/DATABASENAME', {}, err => {
//   if(err) {
//     console.log('Did you forget to fire up the Mongo daemon?')
//   } else {
//     console.log('Successfully connected to the MongoDB database on localhost!');
//   }
// });

// The mongoose.connect() method establishes the name of the Database
// See the Schema for the names of the database collections.
const connect = mongoose.connect('mongodb://localhost/DATABASENAME')

// This style avoids the unhandled promise rejection
// Refactor to us a catch?
// Refactor for Async/Await?
connect.then(() => {
  server.listen(PORT);
  console.log(`The server is listening on ${PORT}`);
  console.log(`Successfully connected to the MongoDB database on localhost ${mongoose.connection.client.topology.s.port}!`);
}, (err) => {
  console.log('\n***************************************************************');
  console.log("ERROR: Couldn't connect to MongoDB. Do you have mongod running?");
  console.log('***************************************************************\n');
});

// GET from the root of the server
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

// This can be put inside the mongooose.connect method:
// Benefits? Liabilities?
// server.listen(PORT, err => {
//   if(err) {
//     console.log('Something is not right in the world.', err);
//   } else {
//     console.log(`The server is listening on port number: ${PORT}.`);
//   }
// });
