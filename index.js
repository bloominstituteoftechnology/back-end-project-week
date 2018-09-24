const express = require('express'); 
const helmet = require('helmet'); 
const knex = require('knex');

const dbConfig = require('./knexfile'); 

const db = knex(dbConfig.development); 

const server = express(); 

server.use(express.json()); 
server.use(helmet()); 

server.get("/", (req, res)=> {
    res.send("API Running..."); 
})

const port = 3001; 
server.listen(port, function(){
    console.log("\n=== WEB API LISTENING 3001 ===\n")
})