
const express = require('express');
const helmet = require('helmet');
const server = express();
const cors = require('cors');
const morgan = require('morgan');

server.use(express.json());
server.use(cors());
server.use(helmet());
server.use(morgan());

const noteRoutes = require('./routes/noteRoutes');

server.use('/api/notes', noteRoutes);

//================TESTING IF API IS RUNNING =====================
server.get('/', (req, res) => {
    res.send('API Running...');
});

module.exports = server;