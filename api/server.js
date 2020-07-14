const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const configRoutes = require('../config/routes.js');
const server = express();

server.use(express.json());
server.use(cors());
server.use(helmet());

configRoutes(server);

server.get('/', (req, res) => {
    res.status(200).json({ api: `running` })
});

module.exports = server;