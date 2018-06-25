const router = require('express').Router()
const Note = require('./Note')

router.get('/', (req, res) => {
  Note.find()
    .then( notes => {
      res.status(200).json(notes)
    })
    .catch( err => {
      res.status(500).json(err.message)
    })
})

router.post('/', (req, res) => {
  const newNote = { title, content, checklist } = req.body
  Note.create(newNote)
    .then( note => {
      res.status(201).json(note)
    })
    .catch( err => {
      res.status(500).json(err.message)
    })
})

module.exports = router