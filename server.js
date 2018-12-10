const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const notesRoute = require('./routes/notes');

const server = express();

server.use(express.json());
server.use(morgan(dev));
server.use(helmet());
server.use(cors());

server.use('/notes, notesRoute');

//sanity check endpoint
server.get('/', (req, res) => {
  res.send({ message: 'Alive!' })
});

module.exports = server; 
