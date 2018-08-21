const router = require('express').Router()
const passport = require('passport')
const Note = require('../models').Note
const Tag = require('../models').Tag

const protectedRoute = passport.authenticate('jwt', { session: false }) // new

//* noteRouter
router.get('/', protectedRoute, (req, res) => {
  console.log('IN GET /api/notes: ')
  console.log('REQ.USER', req.user.id)
  Note.findAll({
    where: { userId: req.user.id }
  })
    .then(notes => {
      res.status(200).json({ notes: notes, username: req.user.username })
    })
    .catch(err => res.status(500).json(err))
})

router.post('/', protectedRoute, (req, res) => {
  console.log('IN  POST /api/notes: ')
  const { id } = req.user
  const { title, content } = req.body
  const newNote = { title, content, userId: id }
  Note.create(newNote)
    .then(note => res.status(201).send(note))
    .catch(err => console.log(err))
})

router.delete('/:id', protectedRoute, (req, res) => {
  Note.findById(req.params.id)
    .then(note => {
      note.destroy()
      Note.findAll({ username: req.user.username }).then(notes => {
        res.status(201).json(notes)
      })
    })
    .catch(err => res.status(500).json(err))
})

router.put('/:id', protectedRoute, (req, res) => {
  const { title, content } = req.body
  Note.findById(req.params.id)
    .then(note => {
      note
        .update({
          title: title || note.title,
          content: content || note.content
        })
        .then(updateNote => {
          console.log('updatedNote', updateNote)
          Note.findAll({ username: req.user.username }).then(notes => {
            res.status(201).json(notes)
          })
        })
    })
    .catch(err => res.status(500).json(err))
})

module.exports = router
