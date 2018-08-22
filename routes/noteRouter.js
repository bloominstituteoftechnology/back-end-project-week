const router = require('express').Router()
const passport = require('passport')

const {
  getNotes,
  getNote,
  postNote,
  deleteNote,
  updateNote
} = require('../controllers').note

//* Local Middleware
const protectedRoute = passport.authenticate('jwt', { session: false }) // new

//* noteRouter
router.get('/', protectedRoute, getNotes)

router.get('/:id', protectedRoute, getNote)

router.post('/', protectedRoute, postNote)

router.delete('/:id', protectedRoute, deleteNote)

router.put('/:id', protectedRoute, updateNote)

module.exports = router
