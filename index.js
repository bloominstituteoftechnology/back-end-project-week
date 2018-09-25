const express = require('express'); 
const helmet = require('helmet'); 
const knex = require('knex');

const dbConfig = require('./knexfile'); 

const db = knex(dbConfig.development); 

const server = express(); 

server.use(express.json()); 
server.use(helmet()); 

server.get("/", (req, res)=> {
    res.send("API Running..."); 
})

server.get("/notes", (req, res)=>{
    db('notes')
    .then(notes => res.status(200).json(notes))
    .catch(err => res.status(500).json(err)); 
})

server.get("/notes/:id", (req, res) => {
    const { id } = req.params; 
    db("notes")
    .where({id})
    .then(note => res.status(200).json(note))
    .catch(err => res.status(500).json(err)); 
})

server.post("/notes", (req, res) => {
    const note = req.body; 
    const {title} = req.body; 
    const {content} = req.body; 
    if(!title & !content){
        res
            .status(400)
            .json({errorMessage: "note needs a title and content"});
    }
    db.insert(note)
        .into('notes')
        .then(ids => {
            res.status(201).json(ids);
        })
        .catch(err => res.status(500).json(err))
});

server.delete('/notes/:id', (req, res) => {
    const { id } = req.params; 
    db("notes")
    .where({id})
    .del()
    .then(count => {
        res.status(200).json(count); 
    })
    .catch(err => {
        res.status(500).json(err);
    });
})

server.put("/notes/:id", (req, res) => {
    const changes = req.body;
    const {id} = req.params;

    db("notes")
        .where({id})
        .update(changes)
        .then(count => {
            res.status(200).json(count);
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

const port = 3001; 
server.listen(port, function(){
    console.log("\n=== WEB API LISTENING 3001 ===\n")
})