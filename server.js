const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const configureRoutes = require('./config');

const server = express();

server.use(express.json());
server.use(morgan('dev'));
server.use(cors());
configureRoutes(server);

server.get('/', (req, res) => {
  res.send('ya made it mon');
});

module.exports = server;
