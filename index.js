const express = require('express');
const knex = require("knex");
const server = express();
const dbConfig = require("./knexfile");

const db = knex(dbConfig.development);

server.use(express.json());

//testing the server
server.get('/', (req, res) => {
    res.send("Hello WOrld");
});




server.listen(8000, () => console.log("======API Running on Port 8000======="))