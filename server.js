const express = require('express');
const knex = require('knex');
const knexConfig = require('./knexfile.js');
const db = knex(knexConfig.development);
const cors = require('cors');

const server = express();
server.use(express.json());

server.get('/', (req, res) => {
    res.send({ API: 'is live' });
});

module.exports = server;