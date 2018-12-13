const express = require('express');
const cors = require('cors');
const db = require('./database/dbConfig.js');

const server = express();

server.use(express.json());
server.use(cors());
// /Endpoint
server.get('/', (req,res) => {
    res.status(200).json({Server : "Running"})
})
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
    .first()
    .then(note => {
        res.status(200).send(note)
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

//  PUT /note/edit/:id  Edit Note Endpoint
server.put('/note/edit/:id', (req,res) => {
    const ID = req.params;
    const edits = req.body;
    db('notes')
    .where(ID)
    .update(edits)
    .then(count => {
        res.status(200).send(`${count} note edited`);
    })
    .catch(err => {
        res.status(500).json({ERROR : err})
    })
    
})//Errors

//  DELETE  /note/delete/:id
server.delete('/note/delete/:id', (req,res) => {
    const ID = req.params;
    db('notes')
    .where(ID)
    .delete()
    .then(count => {
        res.status(200).send(`${count} notes deleted`)
    })
    .catch(err => {
        res.status(500).json({message : "error deleting note", error : err})
    })
})

module.exports = {
    server,
};