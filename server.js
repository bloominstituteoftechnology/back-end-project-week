const bodyParser = require('body-parser');
const express    = require('express');
const mongoose   = require('mongoose');
const cors       = require('cors');

const server = express();

server.use(bodyParser.json());
server.use(cors());

module.exports = {
  server
}
