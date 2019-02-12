const express = require('express');

const db = require('../data/helpers');

const server = express();

server.use(express.json());


module.exports = server;