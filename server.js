const express = require('express');
const cors = require('cors');

const routes = require('./api/routes/routes')
const config = require('./config')

const server = express();

const { frontEndLocation: { address } } = config;

const corsOptions = {
  origin: address,
  credentials: true
}

server.use(express.json());
server.use(cors(corsOptions));

routes(server);

module.exports = {
  server
};