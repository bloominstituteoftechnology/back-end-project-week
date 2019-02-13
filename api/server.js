const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const notesRouter = require('./routers/notesRouter.js');
const server = express();

server.use(express.json());
server.use(cors());
server.use(helmet());
server.use(morgan('dev'));
server.use('/api/notes', notesRouter);