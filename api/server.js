const express = require('express');
const server = express();
const knex = require('knex')
const knexConfig = require('../knexfile');
const db = knex(knexConfig.development)

const cors = require('cors');
server.use(cors());
server.use(express.json())

 server.get('/note/get/all', async (req, res) => {

    try{
        const notes = await db('notes');
        if(notes){
            res.status(200).json(notes)
        }

    }

    catch(err){
        res.status(500).json({message: 'An error occured while retrieving the data.'})
    }
});

 server.post('/note/create', async (req, res) => {
     const note = {title, content} = req.body;

     try{
        const response = await db('notes').insert(note);
        res.status(200).json(response) 
        
    }

     catch(err){
        res.status(500).json({message: 'An error occured while processing the data.'})
     }
});

 server.put('/note/edit/:id', async (req, res) => {
    const id = req.params.id;
    const {title, content} = req.body;
    try{
        if(title && content){
            const updated = await db('notes').where({id}).update({title, content})
            res.status(200).json(updated)
             }
        else if(title && !content){
                const updated = await db('notes').where({id}).update({title})
                res.status(200).json(updated)
            }
        else if(!title && content){
            const updated = await db('notes').where({id}).update({content})
            res.status(200).json(updated)
            }
        else{
            res.status(400).json({message: 'Please submit the proper inputs.'})
        } 
    }
    catch(err){
        res.status(500).json({message: 'An error occured while processing the data.'})
    }
});

 server.delete('/note/delete/:id', async (req, res) => {
    const id = req.params.id;
    try{
        const response = await db('notes').where({id}).del()
        res.status(200).json(response)
    }
    catch(err){
        res.status(500).json({message: 'An error occured while processing the data.'})
    }
});



module.exports = server;