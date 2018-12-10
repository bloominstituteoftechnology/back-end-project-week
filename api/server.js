const express= require('express');
const server= express();
server.use(express.json());

const knex= require('knex')
const knexConfig= require('../knexfile');
const db= knex(knexConfig.development);


module.exports=server;