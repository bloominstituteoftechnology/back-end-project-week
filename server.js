const express = require('express');
const helmet = require('helmet');
const notesRoute = require('./routes/api/notes/notes');
const db = require('./data/dbConfig');

const server = express();

server.use(express.json());
server.use(helmet());

server.use('/api/notes', notesRoute);

// Test route
server.get('/', (req, res) => {
  res.status(200).json({ notes: 'api/notes' });
});

module.exports = server;
