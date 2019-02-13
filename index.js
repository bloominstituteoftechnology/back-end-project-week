require('dotenv').config();

const express  = require('express');
const helmet   = require('helmet');
const morgan   = require('morgan')
const cors     = require('cors')


const db       = require('./data/dbConfig.js')

const PORT   = process.env.API_PORT;

const server = express();
server.use(express.json()); 
server.use(cors('localhost:5050'))
server.use(
            helmet(),
            morgan('dev'),
          );

//endpoints

server.get('/api/notes', (req, res) =>{
  db('notes')
  .then(notes =>{
    res.json(notes)
  })
  .catch(err =>{
    res
    .status(500)
    .json({message:'unable to retrieve information'})
  })
})

server.post('/api/notes',(req, res) =>{
  const cohort= req.body
  db('notes').insert(cohort)
  .then(id =>{
    res
    .status(201).json({msg:`id ${id} created`})
  })
  .catch(err =>{
    res
    .status(500)
    .json({message:'unable to save information to database'})
  })
})

server.get('/api/notes/:id',(req, res) =>{
  const { id } = req.params
  db('notes').where('id', id)
  .then(note =>{
    res.json(note)
  })
  .catch(err =>{
    res
    .status(500)
    .json({message:'unable to retrieve specified id '})
  })
})

server.delete('/api/notes/:id',(req, res) =>{
  const { id } = req.params
  db('notes')
  .where('id',id)
  .del()
  .then(rowCount =>{
    res
    .status(201)
    .json(rowCount)
  })
  .catch(err =>{
    res
    .status(500)
    .json({message:'unable to delete specified id '})
  })
})

server.put('/api/notes/:id',(req, res) => {
  const { id } = req.params
  const note = req.body
  db('notes')
  .where('id', id)
  .update(note)
  .then(rowCount=>{
    res.json(rowCount)
  })
  .catch(err =>{
    res
    .status(500)
    .json({message:'unable to modify specified id'})
  })
})

//listen
server.listen(PORT, () =>{
  console.log(`\n=== Web API Listening on http://localhost:${PORT} ===\n`);
})