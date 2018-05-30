const express = require('express')
const authenticated = require('../middleware/authenticated')

const noteRouter = express.Router()

noteRouter.use(authenticated)

noteRouter.get('/', (req, res) => {
  res.status(200).send({ message: 'authorized!' })
})

module.exports = noteRouter