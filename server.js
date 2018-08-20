const express = require('express')
const db = require('knex')(require('./knexfile').development)

const server = express()
server.use(express.json())

server.get('/notes', async (req, res) => {
  try {
    const notes = await db('notes')
    res.status(200).json(notes)
  } catch (e) {
    next(e)
  }
})

server.use((err, req, res, next) => {
  res.status(500).json(err)
})

//server.listen(1234, () => console.log('... 1234 ...'))

module.exports = server
