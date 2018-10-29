const express = require('express');
const helmet = require('helmet');
const knex = require('knex');

const knexConfig = require('./knexfile.js');
const db = knex(knexConfig.development);
const server = express();

server.use(helmet());
server.use(express.json());

const helperMethods = require('./data/helper-methods.js');

server.get('/', (req, res)=>{
    res.send("it's alive!");
});

server.get('/api/note/get',(req,res)=>{
    helperMethods.getDishes()
      .then(dish=>{
        res.status(200).json(dish);
      })
      .catch(err=>res.status(500).json(err));
});

server.listen(9000, ()=>console.log('\nAPI running on 9000\n'));