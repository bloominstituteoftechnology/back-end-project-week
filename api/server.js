const express = require('express');

var cors = require('cors');

// Then use it before your routes are set up:

const server = express();

server.use(express.json());
server.use(cors());

const notesRouter = require('../notes/notesRouter.js');

//sanity check endpoint
server.get('/', (req, res) => {
  res.status(200).json({ api: 'up' });
});

//Notes Methods
server.get('/notes', notesRouter);
server.get('/notes/all', notesRouter);
// server.post('/api/games', notesRouter);

module.exports = server;
