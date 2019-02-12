const express = require('express');
const cors = require('cors');

const server = express();

server.use(express.json());
server.use(cors());

server.get('/', (req, res) => {
    res
        .send({ message: 'working so far' })
})

module.exports = server;