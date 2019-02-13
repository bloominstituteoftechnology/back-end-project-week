const express = require('express');
const knex = require('knex');

const dbConfig = require('./knexfile');
const db = knex(dbConfig.development);

const PORT = 4200;
const server = express();

server.use(express.json());

//Server
server.listen(PORT, () => {

    console.log(`breathing on port ${PORT}`)
}) 