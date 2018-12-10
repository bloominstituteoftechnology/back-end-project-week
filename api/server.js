const express = require('express');
const configureMiddleware = require('../config/configureMiddleware');
const configureRoutes = require('../config/configureRoutes');

const server = express();
configureMiddleware(server);
configureRoutes(server);

server.get('/', (req, res) => {
    res.status(200).json({aliveAt: '/'})
})


module.exports = server;
