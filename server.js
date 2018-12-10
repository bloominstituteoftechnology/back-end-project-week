// Imports
const express = require('express');
// Initializes the server
const server = express();
// Middleware setup
server.use(express.json());

// Endpoints
server.get('/', (req, res) => res.send('API UP'));

module.exports = server;
