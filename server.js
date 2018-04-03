const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');


const server = express();
server.use(express.json());
server.use(morgan('combined'));

module.exports = server;