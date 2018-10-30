const express = require('express');
const helmet = require('helmet');

const knex = require('knex');
const knexConfig = require('./knexfile.js');

const db = knex(knexConfig.development);
const server = express();

server.use(express.json());
server.use(helmet());

const port = 8000;
server.listen(port, () => console.log(`API running on port ${port}`));