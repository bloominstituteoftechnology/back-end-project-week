const router = require('express').Router()
const Note = require('./Note')

router
  .route('/')
  .get((req, res) => {
    Note.find()
      .then( notes => {
        res.status(200).json(notes)
      })
      .catch( err => {
        res.status(500).json(err.message)
      })
  })

  .post((req, res) => {
    const newNote = { title, content, checklist } = req.body
    Note.create(newNote)
      .then( note => {
        res.status(201).json(note)
      })
      .catch( err => {
        res.status(500).json(err.message)
      })
  })

router
  .route('/:id')
  .get((req, res) => {
    const { id } = req.params
    Note.findById(id)
      .then( note => {
        res.status(200).json(note)
      })
      .catch( err => {
        res.status(500).json(err.message)
      })
  })

  .put((req, res) => {
    const { id } = req.params
    const editedNote = { title, content, checklist } = req.body
    Note.findByIdAndUpdate(id, editedNote, {new: true})
      .then( note => {
        res.status(200).json(note)
      })
      .catch( err => {
        res.status(500).json(err.message)
      })
  })

  .delete((req, res) => {
    const { id } = req.params
    Note.findByIdAndRemove(id)
      .then( note => {
        res.status(200).json(note)
      })
      .catch( err => {
        res.status(500).json(err.message)
      })
  })

module.exports = router