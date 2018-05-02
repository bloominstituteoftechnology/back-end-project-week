const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');

mongoose
    .connect('mongodb://localhost/notesdb')
    .then(() => console.log('\n=== connected to mongo ===\n'))
    .catch(err => console.log('error connecting to mongo'));

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());
server.use(morgan('dev'));

server.get('/', function (req, res) {
  res.send('Hello World! from the server');
});
server.listen(5500, function () {
  console.log('Server listening on port 5500!');
});