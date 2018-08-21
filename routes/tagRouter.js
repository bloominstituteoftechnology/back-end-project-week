const router = require('express').Router()
const passport = require('passport')
const Tag = require('../models').Tag

const protectedRoute = passport.authenticate('jwt', { session: false }) // new

router.post('/', protectedRoute, (req, res) => {
  console.log('IN /api/tags')
  const { value } = req.body
  const newTag = { value }
  Tag.create(newTag)
    .then(savedTag => {
      console.log('SAVED TAG:', savedTag)
      Tag.findAll()
        .then(tags => {
          res.status(201).json(tags)
        })
        .catch(err => console.log(err))
    })
    .catch(err => console.log(err))
})

module.exports = router
