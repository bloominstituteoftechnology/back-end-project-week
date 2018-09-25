const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const configureRoutes = require('./config/routes');

const server = express();
const corsOptions = {


}

server.use(express.json());
server.use(cors());
server.use(helmet());

configureRoutes(server);

module.exports = {
    server,
};