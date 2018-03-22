const express = require('express');
const cors = require('cors');
const morgan = require('morgan')
const router = require('./router')

const server = express();
const debug = false;

debug ? server.use(morgan('combined')) : null;

server.use(express.json());

const corsOptions = {
    "origin": "http://localhost:3000",
    "credentials": true
};

server.use(cors(corsOptions));
server.use('/api', router);

server.get('/', (req, res) => {
    res.send(200).json({ message: 'It feels good to be alive!' })
});

module.exports = server;