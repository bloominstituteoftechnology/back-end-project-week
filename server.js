const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const configureRoutes = require('./db/routes/notes');

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

configureRoutes(server);

module.exports = {
    server,
  };
  