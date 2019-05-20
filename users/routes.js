const router = require('express').Router()

const usersDB = require('./schema')
const notesDB = require('../notes/schema')

const middleware = require('./middleware')

const {
  authenticate,
  validate } = middleware

router.get('/:id/notes', authenticate, (req, res) => {
  const { id } = req.params

  usersDB
  .findById(id)
  .populate('notes', 'id title text')
  .then(user => {
    const {
      id,
      notes } = user

    if (!user) return res
      .status(404)
      .json('The requested resource was not found.')
    else res
      .status(200)
      .json({
        id,
        notes
      })
  })
  .catch(() => res
    .status(500)
    .json('An internal server error occurred while retrieving notes from the database.'))
})

router.get('/:id/note/:noteId', authenticate, (req, res) => {
  const {
    id,
    noteId } = req.params

  usersDB
  .findOne({
    $and: [
      { _id: id },
      { notes: noteId }
    ]
  })
  .then(user => {
    if (!user) return res
      .status(404)
      .json('The requested resource was not found.')
    else notesDB
      .findById(noteId)
      .then(note => {
        const {
          _id,
          title,
          text
        } = note

        if (!note) return res
          .status(404)
          .json('The requested resource was not found.')
        else res
          .status(200)
          .json({
            id: _id,
            title,
            text
          })
      })
      .catch(() => res
        .status(500)
        .json('An internal server error occurred while retrieving a note from the database.'))
  })
  .catch(err => res
    .status(500)
    .json('An internal server error occurred while retrieving a note from the database. 2'))
})

router.post('/:id/notes', authenticate, validate, (req, res) => {
  const { id } = req.params
  const {
    title,
    text } = req.body
  
  usersDB
  .findById(id)
  .then(user => {
    if (!user) return res
      .status(404)
      .json('The requested resource was not found.')
    else notesDB
      .create({
        title,
        text
      })
      .then(note => {
        const { _id: noteId } = note
          
        usersDB
        .findOneAndUpdate(id,
        { $push: { notes: noteId }}, 
        {
          new: true,
          runValidators: true,
          useFindAndModify: false
        })
        .then(() => {
          res
          .status(201)
          .json({ id: noteId })
        })
        .catch(() => res
          .status(500)
          .json('An internal server error occurred while adding a note to the database.'))
      })
      .catch(() => res
        .status(500)
        .json('An internal server error occurred while adding a note to the database.'))
  })
  .catch(() => res
    .status(500)
    .json('An internal server error occurred while adding a note to the database.'))
})

router.put('/:id/notes/:noteId', authenticate, (req, res) => {
  const {
    id,
    noteId } = req.params
  const {
    title,
    text } = req.body
  
  usersDB
  .findOne({
    _id: id,
    notes: noteId
  })
  .then(user => {
    if (!user) return res
      .status(404)
      .json('The requested resource was not found.')
    else notesDB
      .findByIdAndUpdate(noteId,
      {
        title,
        text
      },
      {
        new: true,
        runValidators: true
      })
      .then(note => {
        const { _id } = note

        res
        .status(200)
        .json({ id: _id })
      })
      .catch(() => res
        .status(500)
        .json('An internal server error occurred while modifying a note from the database.'))
  })
  .catch(() => res
    .status(500)
    .json('An internal server error occurred while modifying a note from the database.'))
})

router.delete('/:id/notes/:noteId', authenticate, (req, res) => {
  const {
    id,
    noteId } = req.params
  
  usersDB.findById(id)
  .then(user => {
    if (!user) return res
      .status(404)
      .json('The requested resource was not found.')
    else notesDB
      .findByIdAndRemove(noteId)
      .then(note => {
          console.log()
          if (note.n === 0) return res
            .status(404)
            .json('The reqested resource was not found.')
          else usersDB
            .findByIdAndUpdate(userId,
              {
                $pull: {
                  notes: noteId
                }
              },
              {
                new: true,
                runValidators: true
              })
            .then(user => {
              if (!user) return res
                .status(404)
                .json('The requested resource was not found.')
              else return res
                .status(200)
                .json('The note was succesfully deleted.')
            })
            .catch(() => res
              .status(500)
              .json('An internal server error occurred while deleting a note from the database.'))             
        })
        .catch(() => res
          .status(500)
          .json('An internal server error occurred while deleting a note from the database.'))
    })
    .catch(() => res
      .status(500)
      .json('An internal server error occurred while deleting a note from the database.'))
})

module.exports = router