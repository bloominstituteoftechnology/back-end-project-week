const express= require('express');
const server= express();
const cors= require('cors');
server.use(express.json());
server.use(cors());

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

server.post('/api/notes', (req, res)=>{
    const newNote= req.body;
    db('notes').insert(newNote)
    .then((id)=>{
        res.status(201).json(id)
    })
    .catch(error=>{
        res.status(500).json({message: 'fail to add note'})
    })
})

server.get('/api/notes/delete/:id', (req, res)=>{
    const {id}= req.params;
    db('notes').delete().where('notes.id',id)
    .then((note)=>{
        res.status(201).json(note)
    })
    .catch(error=>{
        res.status(500).json({message:'fail to delete specific note'})
    })
})

server.put('/api/notes/:id', (req, res)=>{
    const {id}= req.params;
    const changes=req.body
    db('notes').update(changes).where('notes.id',id)
    .then((note)=>{
        res.status(201).json(note)
    })
    .catch(error=>{
        res.status(500).json({message:'fail to update specific note'})
    })
})



module.exports=server;