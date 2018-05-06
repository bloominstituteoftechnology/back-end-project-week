const router = require('express').Router()

const { get, login, post } = require('./controller')
const { catchErr } = require('../util')

router.get('/', (req, res) => res.json({ test: 'hi' }))
router.post('/', catchErr(post))
router.post('/login', catchErr(login))

module.exports = router