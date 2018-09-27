const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const configureRoutes = require('./db/routes/notes');

const server = express();
const corsOptions = {
  credentials: true,
  origin: "https://nifty-almeida-2f92e2.netlify.com"
};

server.use(helmet());
server.use(express.json());
server.use(cors(corsOptions));

configureRoutes(server);

module.exports = {
    server,
  };
  