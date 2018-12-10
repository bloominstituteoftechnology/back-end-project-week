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

});

 server.put('/note/edit/:id', async (req, res) => {

});

 server.delete('/note/delete/:id', async (req, res) => {

});



module.exports = server;