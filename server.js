const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');

const server = express();

server.use(cors());
server.use(helmet());
server.use(morgan('dev'));
server.use(express.json());

module.exports = server;
