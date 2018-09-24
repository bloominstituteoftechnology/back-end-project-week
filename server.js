const express = require('express');
const server = express();
server.use(express.json()); 

const knex = require('knex'); 
const dbConfig = require("./knexfile");
const db = knex(dbConfig.development);

const cors = require('cors'); 
server.use(cors()); 

server.get('/', (req, res) => {
    res.send('We are a go Mr. Snowblow!'); 
})

module.exports = server;