const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
//const Users = require('./#');
//const Notes = require('./#');
const server = express();

const corsOptions = {
    origin: 'https://lambdanotes1.herokuapp.com/',
    credentials: true
}

server.use(helmet());
server.use(express.json());
server.use(morgan('dev'));
server.use(cors(corsOptions));

module.exports = server;