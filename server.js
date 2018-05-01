const express = require('express');

const server = express();

server.get('/', (req, res) => {
  res.json('API is running ok ok!');
});

module.exports = server;
