const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const authRoute = require('./routes/api/auth/auth');
const notesRoute = require('./routes/api/notes/notes');
const usersRoute = require('./routes/api/users/users');

const server = express();

server.use(express.json());
server.use(helmet());
server.use(cors());

server.use('/api/auth', authRoute);
server.use('/api/notes', notesRoute);
server.use('/api/users', usersRoute);

// Test route
server.get('/', (req, res) => {
  res.status(200).json({ notes: 'api/notes' });
});

module.exports = server;
