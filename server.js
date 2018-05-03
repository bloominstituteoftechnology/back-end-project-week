const express = require('express')
const mongoose = require('mongoose')
const helmet = require('helmet')
const logger = require('morgan')
const cors = require('cors')
const Note = require('./notes/Note')

const server = express()

const uri = 'mongodb://cesar:cesar@ds014658.mlab.com:14658/notes-db'
mongoose
  .connect(uri)
  .then(() => console.log(`\n=== Mongo Online ===\n`))
  .catch(err => console.log(err))

server.use(helmet())
server.use(logger('dev'))
server.use(express.json())
server.use(cors())

server.get('/', (req, res) => res.json({ msg: `Server Online` }))

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
  const { id } = req.params
  Note.findByIdAndRemove(id)
    .then(removed => {
      Note.find()
        .then(notes => {
          res.status(200).json(notes)
        })
        .catch(err => console.log(err))
    })
    .catch(err => console.log(error))
})

server.put('/api/notes/:id', (req, res) => {
  const { id } = req.params
  const { title, content } = req.body
  Note.findByIdAndUpdate(id, { title, content })
    .then(updated => {
      console.log('updated', updated)
      Note.find()
        .then(notes => {
          res.status(200).json(notes)
        })
        .catch(err => console.log(err))
    })
    .catch(err => console.log(err))
})

const port = process.env.PORT || 5000
server.listen(port, () => {
  console.log(`\n API running on ${port}`)
})
