const express = require('express');
const db = require('./data/db');

const port = 6000;

const server = express();

server.use(express.json());

server.listen(port, function() {
  console.log(`\n ==== Web API listening on http://localhost:${port} ==== \n`);
});