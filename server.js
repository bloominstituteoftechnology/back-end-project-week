const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const routes = require('./routes/routes');
const server = express();

const corsOptions = {
    origin: '*',
    credentials: true
}

server.use(helmet());
server.use(express.json());
server.use(morgan('dev'));
server.use(cors(corsOptions));
routes(server);
module.exports = server;