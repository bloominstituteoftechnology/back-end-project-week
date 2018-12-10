const express = require('express');
const cors = require('cors');
const db = require('./database/dbConfig.js');

const server = express();

server.use(express.json());
server.use(cors());

//  GET  note/get/all
server.get('/note/get/all',(req,res)=>{
    db('notes')
    .then(notes => {
        if(notes){
            res.status(200).json(notes);
        }else{
            res.status(200).send("No notes in database")
        }
    })
    .catch(err => {
        res.status(500).json({Error : err})
    })
})

//  GET /note/get/:id
server.get('/note/get/:id', (req,res) => {
    const ID = req.params;

    db('notes')
    .where(ID)
    .then(note => {
        res.status(200).json(note)
    })
    .catch(err => {
        res.status(500).json(err)
    })
})

//  POST    /note/create    Create New Note Endpoint
server.post('/note/create',(req,res) => {
    const data = req.body;
    if(data.title && data.textBody){
        db('notes')
        .insert(data)
        .then(id => {
            res.status(200).json({ID : id})
        })
        .catch(err => {
            res.status(500).json({Error : err})
        })

    }else{
        res.status(417).json({message : "Send title and textBody fields"})
    }
})

module.exports = {
    server,
};