const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const session = require('express-session');

const { secret } = require('./config');

const server = express();

const routes = require('./routes/Routes');

// server.use(bodyParser.json());
server.use(express.json());
server.use(cors());
server.use(session({
  secret: secret,
  resave: true, 
  saveUninitialized: false
}));

routes(server);

module.exports = {
  server
};
