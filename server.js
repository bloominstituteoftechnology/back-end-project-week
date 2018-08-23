const express = require('express')
const db = require('knex')(require('./knexfile').development)

const server = express()
server.use(express.json())
server.use(require('cors')())
server.use(require('helmet')())

const routeInfo = `
  <style>
    body {
      font-family: Consolas, "Andale Mono WT", "Andale Mono", "Lucida Console", "Lucida Sans Typewriter", "DejaVu Sans Mono", "Bitstream Vera Sans Mono", "Liberation Mono", "Nimbus Mono L", Monaco, "Courier New", Courier, monospace;
      font-size: 1rem;
    }
  </style>
  <h1>GET /</h1>
  <h1>GET /notes</h1>
  <h1>GET /notes/:id</h1>
  <h1>POST /notes</h1>
  <h1>PUT /notes/:id</h1>
  <h1>DELETE /notes/:id</h1>
`

server.get('/', (req, res) => {
  res.status(200).send(routeInfo)
})

server.post('/notes', async (req, res, next) => {

  checkRequestBody(req, next)

  try {
    const ids = await db('notes').insert(req.body)
    res.status(200).json({id: ids[0], ...req.body})
  } catch (e) {
    next({
      code: 500,
      message: e.message
    })
  }
})

server.get('/notes', async (req, res, next) => {
  try {
    const notes = await db('notes')
    res.status(200).json(notes)
  } catch (e) {
    next({
      code: 500,
      message: e.message
    })
  }
})



server.get('/notes/:id', async (req, res) => {
  const id = +req.params.id
  try {
    const note = await db('notes')
      .where('id', '=', id)
    res.status(200).json(note)
  } catch (e) {
    next({
      code: 500,
      message: e.message
    })
  }
})

server.put('/notes/:id', async (req, res, next) => {
  
  checkRequestBody(req, next)
  
  const id = +req.params.id
  
  try {
    const success = await db('notes')
      .where('id', '=', id)
      .update(req.body)

    success && res.status(200).json({ id, ...req.body })

  } catch (e) {
    next({
      code: 500,
      message: e.message
    })
  }
})

server.delete('/notes/:id', async (req, res, next) => {
  const id = +req.params.id

  try {
    const success = await db('notes')
      .where('id', '=', id)
      .delete()

    success && res.status(200).send(`[note: ${id}] deleted successfully!`)
  } catch (e) {
    next({
      code: 500,
      message: e.message
    })
  }
})



server.use((err, req, res, next) => {
  res.status(err.code).json(err.message)
})

function checkRequestBody(req, next) {
  if (!req.body || !req.body.title || !req.body.content) {
    next({
      code: 400, 
      message: 'please provide title and content fields'
    })
  }
}

server.listen(1234, () => console.log('... 1234 ...'))

module.exports = server
