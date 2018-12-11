const express = require('express'); //jak
const helmet = require('helmet');
const knexConfig = require('./knexfile');
const knex = require('knex');
// const bcrypt = require('bcryptjs');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const server = express();

//Initialize db
const db = knex(knexConfig.development);

//Connect Middleware to Server 
server.use(helmet(), express.json());

server.use(cors());

// SANITY CHECK
server.get('/', (request, response) => {
    response.send("Let's QiGongGO!")
});


server.listen(8888, () => console.log('\nrunning on port 8888\n'));