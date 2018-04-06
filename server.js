const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const server = express();
const corsOptions = {
   "origin": "http://localhost:3000",
   "credentials": true
};

server.use(cors(corsOptions));
server.use(express.json());
server.use(morgan('combined'));

module.exports = server;