require('dotenv').config();

const router = require('express').Router()
const jwt = require('jsonwebtoken')

const usersDB = require('./schema')
const notesDB = require('../notes/schema')

const {
  DEV_MONGO_SECRET,
  PROD_MONGO_SECRET
} = process.env

const secret = DEV_MONGO_SECRET || PROD_MONGO_SECRET

let decoded

function restricted(req, res, next) {
  const token = req.headers.authorization

  if (token) {
    jwt.verify(token, secret, (error, decodeURIComponent) => {
      if (error) {
        return res
          .status(401)
          .json('You must login to create, edit and view notes.')   
      }
    
      decoded = jwt.verify(token, secret)
      next()
    })  
  } else res
    .status(401)
    .json('You must login to create, edit and view notes.')
}

function errorReturn(error, msg) {
  const fields = ['title', 'text']

  for (let key in error) {
    for (let field = 0; field < fields.length; field++) {
      if (key === fields[field]) {
        return {
          path: key,
          status: 400,
          message: error[key].message
        }
      }
    }
  }

  return {
    path: null,
    status: 500,
    message: msg
  }
}

router.get('/:userId/notes/', restricted, (req, res) => {
  const { userId } = req.params

  usersDB
    .findById(userId)
    .populate('notes', '_id title text')
    .then(user => {
      if (user === null) return res
        .status(404)
        .json('The requested resource was not found.')
      else if (user.username !== decoded.name) return res
        .status(404)
        .json('The requested resource was not found.')
      else res
        .status(200)
        .json({
          id: user._id,
          username: user.username,
          notes: user.notes
        })
    })
    .catch(() => res
      .status(500)
      .json('An internal server error occurred while retrieving notes from the database.'))
})

router.get('/:userId/notes/:noteId', restricted, (req, res) => {
  const { userId, noteId } = req.params

  usersDB
    .findOne({ _id: userId, notes: noteId })
    .then(user => {
      if (user === null) return res
        .status(404)
        .json('The requested resource was not found.')
      else if (user.username !== decoded.name) return res
        .status(404)
        .json('The requested resource was not found.')
      else notesDB
        .findById(noteId)
        .then(note => {
          if (note === null) return res
            .status(404)
            .json('The requested resource was not found.')
          else res
            .status(200)
            .json({
              id: note._id,
              title: note.title,
              text: note.text
            })
        })
        .catch(() => res
          .status(500)
          .json('An internal server error occurred while retrieving a note from the database.'))
    })
    .catch(() => res
      .status(500)
      .json('An internal server error occurred while retrieving a note from the database.'))
})

router.post('/:userId/notes/', restricted, (req, res) => {
  const { userId } = req.params
  const { title, text } = req.body
  
  usersDB.findById(userId)
    .then(user => {
      if (user === null) return res
        .status(404)
        .json('The requested resource was not found.')
      else if (user.username !== decoded.name) return res
        .status(404)
        .json('The reqested resource was not found.')
      else notesDB
        .create({
          title,
          text
        })
        .then(note => {
          usersDB.findByIdAndUpdate(userId,
            {
              $push: 
              { notes: note._id }
            },
            {
              new: true,
              runValidators: true
            })
          .populate('notes', '_id title text')
            .then(user => {
              res
              .status(201)
              .json({
                id: user._id,
                username: user.username,
                notes: user.notes
              })
            })
            .catch(() => {
              return res
                .status(500)
                .json('An internal server error occurred while adding a note to the database.')
            })
        })
        .catch(() => {
          const errorReceived = errorReturn(error.errors, 'An internal server error occurred while adding a note to the database.')
          res.status(errorReceived.status).json([errorReceived.path, errorReceived.message])
        })
    })
    .catch(() => {
      res
      .status(500)
      .json('An internal server error occurred while adding a note to the database.')
    })
})

router.put('/:userId/notes/:noteId', restricted, (req, res) => {
  const { userId, noteId } = req.params
  const { title, text } = req.body
  
  usersDB.findById(userId)
    .then(user => {
      if (user === null) return res
        .status(404)
        .json('The requested resource was not found.')
      else if (user.username !== decoded.name) return res
        .status(404)
        .json('The requested resource was not found.')
      else usersDB
        .findOne({ _id: userId, notes: noteId })
        .then(user => {
          if (user === null) return res
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
            .then(note => res
              .status(200)
              .json({
                title: note.title,
                text: note.text
              }))
            .catch(error => {
              let errorReceived = errorReturn(error.errors, 'An internal server error occurred while modifying a note from the database.')
              res
              .status(errorReceived.status)
              .json([errorReceived.path, errorReceived.message])
            })
        })
        .catch(() => res
          .status(500)
          .json('An internal server error occurred while modifying a note from the database.'))
    })
    .catch(() => res
      .status(500)
      .json('An internal server error occurred while modifying a note from the database.'))
})

router.delete('/:userId/notes/:noteId', restricted, (req, res) => {
  const { userId, noteId } = req.params
  
  usersDB.findById(userId)
    .then(user => {
      if (user === null) return res
        .status(404)
        .json('The requested resource was not found.')
      else if (user.username !== decoded.name) res
        .status(404)
        .json('The requested resource was not found.')
      else notesDB.findByIdAndRemove(noteId)
        .then(note => {
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
              if (user === null) return res
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