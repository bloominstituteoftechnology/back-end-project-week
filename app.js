const express = require('express');
const mongoose = require('mongoose');

const server = express();

// db connection
mongoose.connect('mongodb://localhost/lambdaNotes');
const db = mongoose.connection;

// db.on('error', console.error('Error connecting to Lambda Notes db'));

db.once('open', () => {
  console.log('Now connected to the Lambda Notes db.');
});

server.use(express.json());

server.listen(3000, function () {
  console.log('Listening on port 3000');
});
