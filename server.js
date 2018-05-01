const express = require('express');
const mongoose = require('mongoose'); // needs to go into model

const server = express();
server.use(express.json());

// morgan
// cors
// helmet

const routes = require('./api/routes');

routes(server);

module.exports = server;
