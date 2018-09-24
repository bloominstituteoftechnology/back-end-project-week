const express = require('express')
const cors = require('cors')

const server = express()
const database = require('./database/databaseConfig')

server.use(express.json())
server.use(cors())

// GET - getting a list of notes from database
server.get('/notes', async (req, res) => {
  // get noteId as _id
  const notes = await database.select({ _id: 'noteId' }, 'title', 'textBody').from('notes') 
  // transform _id from integer to string 
  notes.map(note => note._id = note._id.toString())

  res.status(201).json(notes)
})

// POST - inserting a note with title and textBody to database
server.post('/notes', (req, res) => {
  const note = req.body

  if (!note.title || !note.textBody) {
    res.status(400).json({ message: "Title and textBody are required" })
  } else {
    database.insert(note)
    .into('notes')
    .then(id => res.status(201).json(id[0]))
    .catch(error => res.status(500).json(error))
  }
})

// GET - getting a specific note from database
server.get('/notes/:id', async (req, res) => {
  const note = await database.select({ _id: 'noteId' }, 'title', 'textBody').from('notes').where('noteId', req.params.id)

  note.map(note => note._id = note._id.toString())

  if (note.length === 0) {
    res.status(400).json({ message: `This note (id:${req.params.id}) does not exist` })
  } else {
    // note[0] to get note object
    res.status(201).json(note[0])
  }
})

// PUT - updating a specific note in database
server.put('/notes/:id', (req, res) => {
  const newNote = req.body

  if (!note.title || !note.textBody) {
    res.status(400).json({ message: "Title and textBody are required" })
  } else {
    database.update({ ...newNote })
            .from('notes')
            .where('noteId', req.params.id)
            .then(() => res.status(201).json({ message: `Note (id:${req.params.id}) is updated successfully` }))
            .catch(error => res.status(500).json(error))
  }
})

// DELETE - deleting a specific note in database
server.delete('/notes/:id', (req, res) => {
  database.delete()
          .from('notes')
          .where('noteId', req.params.id)
          .then(() => res.status(201).json({ message: `Note (id:${req.params.id}) is deleted successfully` }))
          .catch(error => res.status(500).json(error))
})

module.exports = server