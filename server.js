// Import node modules
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const notesRoutes = require('./config/notesRoutes.js');

const server = express();// creates the server

// Add GLOBAL MIDDLEWARE
server.use(helmet());
server.use(express.json());
server.use(cors());

server.use('/api', notesRoutes);

module.exports = {
  server,
};