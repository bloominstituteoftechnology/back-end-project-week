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
    .then(response => res.status(200).json({response}))
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err })
    })
})

server.listen(8000, () => console.log('API is running on 8000'))
