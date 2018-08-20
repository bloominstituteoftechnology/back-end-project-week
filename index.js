const express = require('express');
const knex = require('knex');
// const db = require('./data/db.js');
const cors = require('cors');

const knexConfig = require('./knexfile');
const db = knex(knexConfig.development);

const server = express();
server.use(express.json());

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
  console.log(typeof(id));
  db('notes')
    .where('id', id)
    .then(response => res.status(200).json(response))
    .catch(err => {res.status(500).json({ error: '.GET /notes/:id' })})
})

server.listen(8000, () => console.log('API is running on 8000'))
