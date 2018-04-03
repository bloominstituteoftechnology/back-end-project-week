const express = require('express');
const cors = require('cors');

const server = express();
const corsOptions = {
   "origin": "http://localhost:3000",
   "credentials": true
};

server.use(cors(corsOptions));
server.use(express.json());

module.exports = server;