const express = require('express');
const cors = require('cors');

const db = require('./data/db');

const configureRoutes = require('./config/routes');

const server = express();
const corsOptions = {
  // do this later
};

server.use(express.json());
server.use(cors());

configureRoutes(server);

module.exports = {
  server,
};