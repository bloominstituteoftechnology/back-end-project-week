const express = require('express');

const cors = require('cors');

const db = require('./database/dbConfig.js')


const server = express();
const PORT = 4000;

server.use(express.json());
server.use(cors());


server.get('/api/notes', (req,res)=>{
    db('notes')
    .then(notes =>{
        res.json(notes)
    }).catch(err =>{
        res.status(500).json({error:"Cannot get notes", err})
    })
})




server.listen(PORT, () =>{
    console.log(`Listening on port ${PORT}!`)
})


