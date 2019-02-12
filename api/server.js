const express = require('express')
const knex = require('knex')
const helmet = require('helmet')
const cors = require('cors')

const server = express(); 

const dbConfig = require('../knexfile')
const db = knex(dbConfig.development)

server.use(express.json(), helmet(), cors())



server.get('/api/notes', (req, res) => { 
  db('notes').then( notes => {
      res.status(200).json(notes)
  })
  .catch( error => { res.status(400).json({error: "we've encountered an error"})
  })
})

server.post('/api/notes', (req, res) => { 
    const body = req.body
    db('notes').insert(body).then(id => {
        res.status(201).json(id)
    })
    .catch( error => { res.status(400).json({error: "Unable to post note"})})
})

module.exports = {
    server
}



