const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const configureRoutes = require('./db/routes/notes');

const server = express();
const corsOptions = {
  credentials: true,
  origin: "https://vigilant-bartik-729898.netlify.com"
};

server.use(helmet());
server.use(express.json());
server.use(cors(corsOptions));

configureRoutes(server);

module.exports = {
    server,
  };
  