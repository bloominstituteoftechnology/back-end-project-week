const express = require('express')

const router = express()


router.get('/', (req, res) => {
  res.status(200).json({message: 'api up!!'})
})

router.use('/notes', require('./notes/notesRoutes'))
router.use('/users', require('./users/usersRoutes'))

module.exports = router;