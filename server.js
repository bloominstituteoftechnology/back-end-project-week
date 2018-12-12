const express = require('express');

const middleware = require('./middleware');

const server = express();

middleware(server) 

module.exports = server;