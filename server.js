const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const notesRoute = require('./routes/api/notes/notes');

const server = express();

server.use(express.json());
server.use(helmet());
server.use(cors());

server.use('/api/notes', notesRoute);

// Test route
server.get('/', (req, res) => {
  res.status(200).json({ notes: 'api/notes' });
});

module.exports = server;
