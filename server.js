const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');


const server = express();

server.use(express.json());
server.use(helmet());
server.use(morgan('dev'));
server.use(cors());

const notesRoute = require('./routes/notesRoute');
server.use('/notes', notesRoute);

const authRoute = require('./routes/authenticationRoute');
server.use('/auth', authRoute); 

//sanity check endpoint
server.get('/', (req, res) => {
  res.send({ message: 'Alive!' })
});

module.exports = server;
