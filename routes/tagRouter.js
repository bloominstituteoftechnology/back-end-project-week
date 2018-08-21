const router = require('express').Router()
const passport = require('passport')
const { postTag } = require('../controllers').tag

const protectedRoute = passport.authenticate('jwt', { session: false }) // new

router.post('/', protectedRoute, postTag)

module.exports = router
