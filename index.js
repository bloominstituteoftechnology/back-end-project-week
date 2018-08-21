const express = require('express');
const knex = require('knex');
const cors = require('cors');

const knexConfig = require('./knexfile');
const db = knex(knexConfig[ process.env.NODE_ENV || 'development']);

const server = express();
server.use(express.json());
server.use(cors());

///endpoints go here
server.get('/', (req, res) => {res.status(200).json({ api: 'API is running'})})
server.get('/notes', (req, res) => {
  db('notes')
    .then(response => res.status(200).json(response))
    .catch(err => {res.status(500).json({ error: '.GET /notes' })})
})
server.post('/notes', (req, res) => {
  const { title, content } = req.body;
  if (!title || !content) {
    res.status(400).json({ error: 'Title and Content are required'})
  }
  db.insert({ title, content })
    .into('notes')
    .then(response => res.status(201).json(response))
    .catch(err => {res.status(500).json({ error: '.POST /notes' })})
})
server.get('/notes/:id', (req, res) => {
  const id = req.params.id
  db('notes')
    .where('id', id)
    .then(response => {
      if (response.length === 0) {
        res.status(404).json({ error: 'The note with the specified ID does not exist'})
      }
      res.status(200).json(response)
    })
    .catch(err => {res.status(500).json({ error: '.GET /notes/:id' })})
})
server.put('/notes/:id', (req, res) => {
  const id = req.params.id
  const { title, content } = req.body
  if (!title || !content) {
    res.status(400).json({ error: 'Title and Content are required'})
  }
  db('notes')
    .where('id', id)
    .update({ title, content })
    .then(response => {
      if (response === 0) {
        res.status(404).json({ error: 'The note with the specified ID does not exist'})
      }
      res.status(200).json(response)
    })
    .catch(err => {res.status(500).json({ error: '.PUT /notes/:id' })})
})
server.delete('/notes/:id', (req, res) => {
  const id = req.params.id
  db('notes')
    .where('id', id)
    .del()
    .then(response => {
      if (response === 0) {
        res.status(404).json({ error: 'The note with the specified ID does not exist'})
      }
      res.status(200).json(response)
    })
    .catch(err => {res.status(500).json({ error: '.DELETE /notes/:id' })})
})

server.listen(process.env.PORT || 8000, () => console.log('API is running on 8000'))
