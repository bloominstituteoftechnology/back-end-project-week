const express = require('express');
const knex = require('knex');

const knexConfig = require('./knexfile');
const db = knex(​knexConfig.development);

const server = express();
server.use(express.json());

///endpoints go here

server.listen(8000, () => console.log('API is running on 8000'))
