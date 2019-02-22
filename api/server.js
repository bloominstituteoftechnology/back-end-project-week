const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const notesRouter = require('../routers/notesRouter/notesRouter.js');
const usersRouter = require('../routers/usersRouter/usersRouter.js');
const server = express();
require('events').EventEmitter.defaultMaxListeners = 0;

server.use(express.json());
server.use(cors());
server.use(helmet());
server.use(morgan('dev'));
server.use('/api/notes', notesRouter);
server.use('/api', usersRouter);


server.get('/', async (req, res) => {
    res.status(200).json({ api: 'Backend up and running.'})
});

module.exports = server;