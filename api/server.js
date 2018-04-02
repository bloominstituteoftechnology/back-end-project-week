const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const server = express();

// const routes = require('./routes/Routes');

// server.use(bodyParser.json());
server.use(express.json());
server.use(cors());

// routes(server);

module.exports = {
  server
};
