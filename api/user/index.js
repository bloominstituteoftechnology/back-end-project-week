const router = require('express').Router()

const { delUser, getUsers, getUser, login, register } = require('./controller')
const { authenticate, restricted, roleAuth } = require('../util/auth')
const { catchErr } = require('../util')

router.get('/', restricted, roleAuth(['admin']), catchErr(getUsers))
router.put('/:_id?', restricted, roleAuth(['admin']), catchErr(getUser))
router.post('/register', catchErr(register))
router.post('/login', authenticate, catchErr(login))
router.delete('/delete/:_id', restricted, roleAuth(['admin']), catchErr(delUser))

module.exports = router