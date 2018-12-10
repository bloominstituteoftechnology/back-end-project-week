const express = require('express');
const cors = require('cors');
const db = require('./database/dbConfig.js');

const server = express();

server.use(express.json());
server.use(cors());

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

module.exports = {
    server,
};