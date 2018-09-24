// for endpoints
const express = require('express')

const server = express()
const database = require('./database/databaseConfig')

server.use(express.json())

// GET - getting a list of notes from database
server.get('/notes', async (req, res) => {
  const notes = await database.select('title', 'content').from('notes')

  res.status(201).json(notes)
})

// POST - inserting a note with title and content to database
server.post('/notes', (req, res) => {
  const note = req.body

  database.insert(note)
          .into('notes')
          .then(id => res.status(201).json(id[0]))
          .catch(error => res.status(500).json(error))
})

// GET - getting a specific note from database
server.get('/notes/:id', async (req, res) => {
  const note = await database.select('title', 'content').from('notes').where('id', req.params.id)

  res.status(201).json(note)
})

// PUT - updating a specific note in database
server.put('/notes/:id', (req, res) => {
  const newNote = req.body

  database.update({ ...newNote })
          .from('notes')
          .where('id', req.params.id)
          .then(id => res.status(201).json(id[0]))
          .catch(error => res.status(500).json(error))
})

// DELETE - deleting a specific note in database
server.delete('/notes/:id', (req, res) => {
  database.delete()
          .from('notes')
          .where('id', req.params.id)
          .then(id => res.status(201).json(id[0]))
          .catch(error => res.status(500).json(error))
})

module.exports = server