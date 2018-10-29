const express = require('express');
const helmet = require('helmet');
const knex = require('knex');
const server = express();
const knexConfig = require('./knexfile.js')
const db = knex(knexConfig.development)
const cors = require('cors');

server.use(cors());
server.use(helmet());
server.use(express.json());

server.get('/',(req,res)=>{
  res.send('active')
});

server.get('/api/notes',(req,res)=>{
  db('notes')
  .select("id","title","content")
  .then(notes=>{
    res.status(200).json(notes);
  })
  .catch(err=>{
    res.send(err);
  })
})



const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
