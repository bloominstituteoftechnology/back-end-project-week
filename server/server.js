const express = require('express')
const mongoose = require('mongoose')
const helmet = require('helmet')
const logger = require('morgan')
const cors = require('cors')
// const path = require('path')

const Note = require('./notes/LambdaNotes')

const server = express()

// const setupRoutes = require('../setup/routes')
// setupRoutes(server)

const uri = 'mongodb://adfaris:adfaris@ds263639.mlab.com:63639/lambda_notes'
mongoose
  .connect(uri)
  .then(() => console.log(`\n=== Mongo Online ===\n`))
  .catch(err => console.log(err))

server.use(helmet())
server.use(logger('dev'))
server.use(express.json())
server.use(cors())

server.get('/', (req, res) => res.json({ msg: `Server Online` }))

// server.get('/cool', (req, res) => res.send(cool()))
server.get('/api/notes', (req, res) => {
  Note.find()
    .then(notes => {
      res.status(200).json(notes)
    })
    .catch(err => res.status(500).json(err))
})

server.post('/api/notes', (req, res) => {
  const { title, content } = req.body
  const newNote = { title, content }
  console.log(req.body, 'req body', newNote, 'New Note')

  const note = new Note(newNote)
  note
    .save()
    .then(msg => {
      Note.find().then(notes => {
        res.status(201).json(notes)
      })
    })
    .catch(err => res.status(500).json(err))
})

server.delete('/api/notes/:id', (req, res) => {
  Note.remove({ _id: req.params.id })
    .then(response => {
      res.status(201).json(response)
    })
    .catch(err => {
      res.status(500).json(err)
    })
})

server.put('/api/notes/:id', (req, res) => {
  Note.update({ _id: req.params.id }, req.body)
    .then(response => {
      res.status(200).json(200)
    })
    .catch(err => {
      console.log(err)
    })
})
const port = process.env.PORT || 5000
server.listen(port, () => {
  console.log(`\n API running on ${port}`)
  // console.log(process.env)
})
