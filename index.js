const express = require('express');
const helmet = require('helmet');
const knex = require('knex');

const knexConfig = require('./knexfile.js');

const db = knex(knexConfig.development);
const server = express();

server.use(express.json());
server.use(helmet());

server.get('/api/', (req, res) => {
    res.status(200).json({message: "API is running."})
})
const port = process.env.PORT || 3300; 

server.listen(port, () => {console.log(`\n == Server running on ${port} ==\n`)});