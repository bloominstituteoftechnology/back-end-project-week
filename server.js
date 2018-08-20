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

server.get('/notes/:id', (req, res)=> {
    const {id}=req.params;
    db('notes')
    .where({id})
    .then(notes=>{
        res.status(200).json(notes);
    })
    .catch(error => res.status(500).json(error));
});

server.post('/notes', (req,res)=> {
    const note=req.body;
    db.insert(note)
      .into('notes')
      .then(ids=> {
          const id=ids[0];
          res.status(200).json(id, ...note);
      })
      .catch(error=> {
          res.status(500).json(error);
      }); 
});

server.put('/notes/:id', (req, res)=>{
    const changes=req.body;
    const {id}=req.params;
    db('notes')
    .where('id','=', id)
    .update(changes)
    .then(count=>{
        res.status(200).json(count);
    })
    .catch(error=>{
        res.status(500).json(error);
    });
});

server.delete('/notes/:id', (req, res)=>{
    const {id}=req.params;
    db('notes')
    .where({id})
    .del()
    .then(count=>{
        res.status(200).json(count);
    })
    .catch(error=>{
        res.status(500).json(error);
    });
});

////////////////////////////////////

const port=7000;
server.listen(port, function(){
    console.log(`\n==== Web API listening on http://localhost:${port} ====/n`)
})