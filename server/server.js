const express = require('express')
const helmet = require('helmet')
const morgan = require('morgan')

const Notes = require('./models/note')

const app = express()

app.use(morgan('dev'))
app.use(helmet())
app.use(express.json())

app.post('/api/notes', (req, res) => {
  const { body } = req
  try {
    const createdNote = new Notes(body)
    createdNote.save()
    res.status(201).json(createdNote)
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
})
async function getAllNotes(noteModel) {
  const notes = await noteModel.find()
  return notes
}
app.get('/api/notes', (req, res) => {
  getAllNotes(Notes)
    .then(notes => res.status(200).json(Object.create({}, notes)))
    .catch(e => res.status(500).send('Server Error'))
})

module.exports = app
