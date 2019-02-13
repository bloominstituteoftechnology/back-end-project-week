const express = require('express');
const knex = require('knex');


const PORT = 4200;
const server = express();


//Server
server.listen(PORT, () => {
    console.log(`breathing on port ${PORT}`)
}) 