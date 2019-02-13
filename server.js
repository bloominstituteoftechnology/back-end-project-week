const express = require('express');
const cors = require('cors');

const server = express();

server.use(express.json());
server.use(cors());

const endPoints = require('./endPoints');
server.use('/notes', endPoints);

server.get('/', (req, res) => {
    res
        .send({ message: 'working so far' })
})

module.exports = server;