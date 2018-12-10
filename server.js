const express = require('express');
const helmet = require('helmet');

const server = express();

server.use(express.json());
server.use(helmet());

// Test route
server.get('/', (req, res) => {
  res.json({ notes: 'api/notes' });
});

module.exports = server;
