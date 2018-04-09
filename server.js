const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const routes = require('./api/routes/routes');

const server = express();
const corsOptions = {
  credentials: true,
};

server.use(bodyParser.json());
server.use(cors());

routes(server);

module.exports = {
  server
};
