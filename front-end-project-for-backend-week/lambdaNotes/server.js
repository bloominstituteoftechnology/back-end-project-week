const express = require('express');
const helmet = require('helmet');
const routes = require('./serverDerp/routes/routes');
const cors = require('cors');

const corsOptions = {
  "origin": "http://localhost:3000",
  "credentials": true
};

const server = express();
server.use(helmet());
server.use(express.json());
server.use(cors(corsOptions));

routes(server);

module.exports = server;