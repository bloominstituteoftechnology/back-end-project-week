const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const signup = require('./routes/signup');

const server = express();

server.use(morgan('dev'));
server.use(express.json());

server.get('/', (req, res) => {
    res.send({ api: 'Running!!' });
});

server.use('/api/signup', signup);

module.exports = server;