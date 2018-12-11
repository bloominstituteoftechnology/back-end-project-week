const express = require('express');
const cors = require('cors');
const server = express();
const notesRouter = require('./routers/notesRouter.js');
const registerRouter = require('./routers/registerRouter.js');

server.use(express.json());
server.use(cors());

server.use('/api/register', registerRouter);
server.use('/api/notes', notesRouter);

server.get('/', (req, res) => {
    res.status(200).json({ api: 'alive' });
});

module.exports = server;