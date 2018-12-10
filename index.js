const express = require('express');
const helmet = require('helmet')
const knex = require('knex');

const knexConfig = require('./knexfile');
const db = knex(knexConfig.development);

const server = express();

server.use(express.json());
server.use(helmet());

const port = process.env.PORT|| 4443;
server.listen(port, () => console.log(`==== Party at port ${port} ====`));