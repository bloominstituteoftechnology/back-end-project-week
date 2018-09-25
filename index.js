const express = require('express');
const server = express();
const knex = require('knex');
const bcrypt = require('bcryptjs');
const dBConfig = require('./knexfile');
const db = knex(dBConfig.development);

//Middleware
server.use(express.json());

//Endpoints













server.listen(3300, console.log('Listening on Port 3300'));