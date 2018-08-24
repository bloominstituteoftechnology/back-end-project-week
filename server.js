require('dotenv').config();

const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const db = require('./data/db');

const configureRoutes = require('./config/routes');

const server = express();
const corsOptions = {
  // do this later
};

server.use(express.json());
server.use(helmet());
server.use(cors());

configureRoutes(server);

module.exports = {
  server,
};

// memo: from here, look at ./config/routes.js