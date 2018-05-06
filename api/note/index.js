const router = require('express').Router()

const { get, post } = require('./controller')
const { catchErr } = require('../util')

router.get('/:id?', catchErr(get))
router.post('/', catchErr(post))

module.exports = router