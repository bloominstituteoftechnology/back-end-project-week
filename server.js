
const express = require('express');
const helmet = require('helmet');
const knex = require('knex');
const cors = require('cors');

const dbConfig = require('./knexfile.js')

const db = knex(dbConfig.development);

const server = express();

server.use(express.json());
server.use(helmet());
server.use(cors());

// endpoints here

//---------GET REQUESTS-------//

//-----obligatory welcome----///
server.get('/', (req, res) => {
  db('notes')
  .then( notes => {
    res.status(200).send("just leave please, don't even come into my site, it wasn't made for you, you probably wouldn't like it.");
  })
})

//All:

server.get('/api/notes', (req, res) => {
  db('notes')
  .then( notes => {
    res.status(200).json(notes);
  })
  .catch(err =>{
    console.log(err)
    res.status(500).json(err)
  })
})
//BY ID:

server.get('/api/notes/:id', (req, res) => {
  const  {id} = req.params;
  db('notes')
  .select()
  .where('id', id)
  .then( notes => {
    if(notes.length === 0){
      return res.status(404).json({error: "please input a valid note id"})
    }
    res.status(200).json(notes);
  })
  .catch(err =>{
    console.log(err)
    res.status(500).json(err)
  })
})

//----POST ------//

server.post( '/api/notes', (req, res) => {
  const zoo = req.body;

  db.insert(zoo)
  .into('notes')
  .then(notes => {
    res.status(201).json(notes);
  })
  .catch(err => {
    res.status(500).json(err);
  })
})

//-------DELETE------------//

server.delete('/api/notes/:id', (req, res) => {
  const { id } = req.params;
   db('notes')
   .where({ id })
   .del()
   .then( notes => {
     if(notes == 0){
       return res.status(404).json({error: "please input a valid note id"})
     }
     res.status(200).json(notes);
   })
   .catch(err => {
     console.log(err)
     res.status(500).json(err)
   })
})

//-------------PUT-----------//
server.put('/api/notes/:id', (req, res) => {
  const { id } = req.params;
  const name = req.body;

  db('notes')
  .where( { id })
  .update(name)
  .then( notes => {
    if(!notes){
      return res.status(404).json({error: "please input a valid note id"})
    }
    res.status(200).json(notes)
  })
  .catch(err => {
    console.log(err)
    res.status(500).json(err);
  })
});



const port = 8000;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
