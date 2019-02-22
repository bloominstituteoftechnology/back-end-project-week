const express = require('express'),
  router = express.Router(),
  db = require('../data/helpers/noteModel.js'),
  { validateJwt } = require('../middleware/auth')

router
  .post('/', validateJwt, function (req, res) {
    const note = req.body
    const tags = req.body.tags

    delete note.tags

    db.insertNoteTag(note, tags)
      .then(note => res.status(201).json(note))
      .catch(err => {
        console.log(err)
        res.status(500).json({ error: 'There was an error while saving the note to the database' })
      })
  })

  .get('/', function (req, res) {
    db.get(null, { page: req.body.page || 0, pageSize: req.body.pageSize || 10 })
      .then(notes => res.json(notes))
      .catch(err => {
        console.log(err)
        res.status(500).json({ error: 'The notes could not be retrieved' })
      })
  })

  .get('/:id', function (req, res) {
    db.get(req.params.id, { page: req.body.page || 0, pageSize: req.body.pageSize || 10 })
      .then(note => {
        if (!note) return res.status(404).json({ message: 'The note with the specified ID does not exist' })
        res.json(note)
      }).catch(err => {
      console.log(err)
      res.status(500).json({ error: 'The note could not be retrieved' })
    })
  })

  .delete('/:id', validateJwt, function (req, res) {
    db.remove(req.params.id)
      .then(note => {
        if (!note) return res.status(404).json({ message: 'The note with the specified ID does not exist' })
        res.json(note)
      }).catch(err => {
      console.log(err)
      res.status(500).json({ error: 'The note could not be removed' })
    })
  })

  .put('/:id', validateJwt, function (req, res) {
    const { title, textBody } = req.body

    if (!title || !textBody) return res.status(400).json({ errorMessage: 'Please provide title and text body for the project' })

    db.update(req.params.id, req.body)
      .then(note => {
        if (!note) return res.status(404).json({ message: 'The note with the specified ID does not exist' })
        res.json(note)
      }).catch(err => {
      console.log(err)
      res.status(500).json({ error: 'The note could not be modified' })
    })
  })

module.exports = router