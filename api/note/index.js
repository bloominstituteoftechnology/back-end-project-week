const router = require('express').Router()

const { get, post } = require('./controller')
const { authenticate, restricted, roleAuth } = require('../util/auth')
const { catchErr } = require('../util')

router.get('/:_id?', catchErr(get))
router.post('/', restricted, roleAuth(['admin', 'user']), catchErr(post))

module.exports = router