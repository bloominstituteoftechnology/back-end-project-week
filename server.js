const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');

const noteRoutes = require('./routes/noteRoutes');
const userRoutes = require('./routes/userRoutes');

const server = express();

server.use(express.json());
server.use(helmet());
server.use(morgan('combined'));

server.get('/', (req, res) => {
    res.json({ msg: "Connected" })
});

server.use('/notes', noteRoutes);
server.use('/user', userRoutes);

module.exports = server;