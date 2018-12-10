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

server.get('/api/notes/:id', (req, res)=>{
    const {id}= req.params;
    db('notes').select().where('notes.id',id)
    .then((note)=>{
        res.status(201).json(note)
    })
    .catch(error=>{
        res.status(500).json({message:'fail to get specific note'})
    })
})
module.exports=server;