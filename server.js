const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const cool = require('cool-ascii-faces');
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
  res.status(200).json( 'Hello World! From the server');
})

server.get('/coolfaces',(req, res) => {
    res.send(cool());
})

server.get('/jeff', (req, res) => {
    res.send('hai mai name is jeffff')
})

server.listen(5500, function () {
  console.log('Ya server listenin pon port 5500!');
});

