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
      
    res
    .status(200)
    .json({
      id,
      notes
    })
  })
  .catch(err => res
    .status(500)
    .json({
      msg1: 'An internal server error occurred while retrieving notes from the database.',
      msg2: err.message
    }))
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
      .json('You must provide a valid note id to retrieve a note.')
    else notesDB
      .findById(noteId)
      .then(note => {
        const {
          id,
          title,
          text
        } = note
        
        res
        .status(200)
        .json({
          id,
          title,
          text
        })
      })
      .catch(err => res
        .status(500)
        .json({
          msg1: 'An internal server error occurred while retrieving a note from the database.',
          msg2: err.message
        }))
  })
  .catch(err => res
    .status(500)
    .json({
      msg1: 'An internal server error occurred while retrieving a note from the database.',
      msg2: err.message
    }))
})

router.post('/:id/notes', authenticate, validate, (req, res) => {
  const { id } = req.params
  const {
    title,
    text } = req.body
  
  notesDB
  .create({
    title,
    text
  })
  .then(note => {
    const { 
      id: noteId,
      title,
      text
    } = note
          
    usersDB
    .findOneAndUpdate(
    { _id: id},
    { $push: { notes: noteId }}, 
    {
      new: true,
      runValidators: true,
      useFindAndModify: false
    })
    .then(() => {
      res
      .status(201)
      .json({
        id: noteId,
        title,
        text
       })
    })
    .catch(err => res
      .status(500)
      .json({
        msg1: 'An internal server error occurred while adding a note to the database.',
        msg2: err.message
      }))
  })
  .catch(err => res
    .status(500)
    .json({
      msg1: 'An internal server error occurred while adding a note to the database.',
      msg2: err.message
    }))
})

router.put('/:id/note/:noteId', authenticate, validate, (req, res) => {
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
      .json('You must provide a valid note id to update a note.')
    else notesDB
      .findOneAndUpdate(
      { _id: noteId},
      {
        title,
        text
      },
      {
        new: true,
        runValidators: true,
        useFindAndModify: false
      })
      .then(note => {
        const {
          id,
          title,
          text } = note

        res
        .status(200)
        .json({
          id,
          title,
          text
        })
      })
      .catch(err => res
        .status(500)
        .json({
          msg1: 'An internal server error occurred while updating a note from the database.',
          msg2: err.message
        }))
  })
  .catch(err => res
    .status(500)
    .json({
      msg1: 'An internal server error occurred while updating a note from the database.',
      msg2: err.message
    }))
})

router.delete('/:id/note/:noteId', authenticate, (req, res) => {
  const {
    id,
    noteId } = req.params
  
  notesDB
  .findOneAndDelete({ _id: noteId })
  .then(note => {
    if (!note) res
      .status(404)
      .json('You must provide a valid note id to delete a note.')
    else usersDB
      .findOneAndUpdate(
      { _id: id},
      {
        $pull: {
          notes: noteId
        }
      },
      {
        new: true,
        runValidators: true,
        useFindAndModify: false
      })
      .then(() => {
        res
        .status(200)
        .json('The note was succesfully deleted.')
      })
      .catch(err => res
        .status(500)
        .json({
          msg1: 'An internal server error occurred while deleting a note from the database.',
          msg2: err.message
        }))             
  })
  .catch(err => res
    .status(500)
    .json({
      msg1: 'An internal server error occurred while deleting a note from the database.',
      msg2: err.message
    }))
})

module.exports = router