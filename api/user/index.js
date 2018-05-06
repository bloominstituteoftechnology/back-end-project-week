const router = require('express').Router()

const { getUsers, getUser, login, register } = require('./controller')
const { catchErr } = require('../util')
const { authenticate, restricted } = require('../util/auth')

router.get('/', restricted, catchErr(getUsers))
router.put('/:id?', restricted, catchErr(getUser))
router.post('/register', catchErr(register))
router.post('/login', authenticate, catchErr(login))

module.exports = router