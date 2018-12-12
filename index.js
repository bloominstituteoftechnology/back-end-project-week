const express = require('express'); 
const helmet = require('helmet');
const knexConfig = require('./knexfile');
const knex = require('knex');
// const bcrypt = require('bcryptjs');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const server = express();

//Initialize db
const db = knex(knexConfig.development);

//Connect Middleware to Server 
server.use(helmet(), express.json());

server.use(cors());

// SANITY CHECK
server.get('/', (request, response) => {
    response.send("Let's QiGongGO!")
});

// GET Notes: display list of notes

server.get('/api/notes', (req, res) => {
    db('notes') 
    .then(notes=> { 
      res.status(200).json(notes);
    }) 
    .catch(err => {
        console.log(err)
        res.status(500).json({ error: "User notes not available." });
    });
});

// View an existing note.

server.get('/api/notes/:id', (req, res) => {
    const { id } = req.params; 
    db('notes')
    .where({ id })
    .then(notes => res.status(200).json(notes))
    .catch(err => res.status(500).json(err));
  });


server.listen(8888, () => console.log('\nrunning on port 8888\n'));