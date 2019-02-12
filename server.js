const express = require('express');
const server = express();
const middleware = require('./middleware');
const db = require('./dbConfig');
const port = 3000;

middleware(server);
server.use(express.json());


//Get request for all notes
server.get('/', async(req,res) =>{
    const notes = await db('games');
    try{
        res.status(200).json(notes);
    }catch(err){
        res.status(500).json({message: 'Could not get notes data'});
    }
});

//Get request for note by id
server.get('/:id' , (req, res) =>{
    const {id} = req.params;
    db('games').where('id', id)
        .then(rows =>{
            res.status(200).json(rows);
        })
        .catch(() =>{
            res.status(500).json({message: 'Could not fetch not with specified id'})
        });
});

//Post request for creating note


//Delete request


//Put request


server.listen(port, () =>{
    console.log(`Server is up and running on port ${port}`)
});

module.exports = server;