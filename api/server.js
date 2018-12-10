const express= require('express');
const server= express();
server.use(express.json());

const knex= require('knex')
const knexConfig= require('../knexfile');
const db= knex(knexConfig.development);

server.get('/api/notes', (req, res)=>{
    db('notes').select()
    .then(note=>{
        res.status(201).json(note)
    })
    .catch(error=>{
        res.status(500).json({message:'error getting notes'})
    })
})
module.exports=server;