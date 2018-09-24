const express = require('express');
const cors = require('cors');
const knex = require('knex');

const dbConfig = require('./knexfile');

const db = knex(dbConfig.development);

const server = express();

server.use(express.json());
server.use(cors());

server.get('/', (req, res) => {
    db('notes').select('title', 'note', 'editToggle').then(notes => {
        res.status(200).json(notes)
    })
    .catch(err => res.status(500).json(err));
})

module.exports = {
    server,
  };