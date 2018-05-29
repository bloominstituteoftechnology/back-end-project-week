const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const userRouter = require('./users/users.controller');
const notesRouter = require('./users/notes.controller');

const server = express();

server.use(express.json());
server.use(helmet());
server.use(cors());

//Routes
server.use('/api/users', userRouter);
server.use('/api/notes', notesRouter);

//Postman Test ok: http://localhost:8008 
server.get('/', (req, res) => {
    res.json({ Message: 'Server Works' });
});

module.exports = server;