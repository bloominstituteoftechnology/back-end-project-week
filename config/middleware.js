const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');

const notesRouter = require('../routers/notesRouter.js');
const usersRouter = require('../routers/usersRouter.js');

module.exports = server => {
    server.use(express.json());
    server.use(helmet());
    server.use(morgan('dev'));

    server.use('/api/notes', notesRouter);
    server.use('/api/users', usersRouter);
};