const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');

const noteRoutes = require('./routes/noteRoutes');
const userRoutes = require('./routes/userRoutes');

const server = express();

server.use(express.json());
server.use(helmet());
server.use(morgan('combined'));
server.use(cors());

server.get('/', (req, res) => {
    res.json({ msg: "Connected" })
});

server.use('/api/notes', noteRoutes);
// server.use('/api/user', userRoutes);

module.exports = server;