const express = require('express');
const knex = require('knex');

const server = express();
server.use (express.json())

const dbConfig = require('./knexfile'); 
const db = knex(dbConfig.development); 

server.get("/", (req, res) => {
    res.status(200).json({message: "Test"})
})

server.listen(3000, () => console.log("server listening at port 3000"));
