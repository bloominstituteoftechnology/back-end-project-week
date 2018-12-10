const express = require('express');
const knex = require('knex');

const knexConfig = require('./knexfile');
const db = knex(knexConfig.development);

const server = express();


server.use(express.json());



const port = 9000;
server.listen(port, () => console.log(`\n Server is running on port ${port}\n`))