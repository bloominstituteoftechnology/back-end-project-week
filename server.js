const express= require('express');
const db=require('./data/db');
const server=express();

server.use(express.json());

server.get('/', (req, res) => {
    res.send('back-end project week');
});

////////// Endpoints ///////////////

server.get('/notes', (req,res)=> {
    db('notes')
    .then(notes=> {
        res.status(200).json(notes);
    })
    .catch(error=> res.status(500).json(error));
});

////////////////////////////////////

const port=7000;
server.listen(port, function(){
    console.log(`\n==== Web API listening on http://localhost:${port} ====/n`)
})