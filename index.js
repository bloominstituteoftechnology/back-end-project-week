const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');

const usersRouter = require('./users/usersRouter.js');
const notesRouter = require('./notes/notesRouter.js');

const server = express();

const path = process.env.MONGOLAB_URI || 'mongodb://localhost/notes';
mongoose.connect(path);

server.use(helmet());
server.use(express.json());

server.use('/api/notes', notesRouter);
server.use('/api/users', usersRouter);

server.get('/', (req, res) => res.send('API Running...'));

const PORT = process.env.PORT || 5000;
server
  .listen(PORT, () => console.log(`Listening on ${ PORT }`));