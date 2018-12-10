const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');

const server = express();
server.use(express.json());
server.use(cors());
server.use(helmet());
server.use(morgan('combined'));

server.get('/', (req, res) => {
    res.send({message: 'Server up'});
})

module.exports = server;