const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');

const notesRouter = require('../routers/notesRouter.js');
const usersRouter = require('../routers/usersRouter.js');
const authRouter = require('../routers/authenticateRouter.js');

module.exports = server => {
    server.use(express.json());
    server.use(helmet());
    server.use(morgan('dev'));
    server.use(cors());

    server.use('/api/notes', notesRouter);
    server.use('/api/users', usersRouter);
    server.user('/api', authRouter);
};