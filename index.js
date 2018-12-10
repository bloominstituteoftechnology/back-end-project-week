require('dotenv').config();
const express = require('express');
const cors = require('cors');
//const bcrypt = require('bcryptjs');
//const jwt = require('jsonwebtoken');

const db = require('./database/dbConfig.js');

const server = express();

server.use(express.json());
server.use(cors());

/* //FUNCTIONS
function generateToken(note) {
  const payload = {
    subject: note.id,
    title: note.title,
    text: note.note_text, //added manually here; normally would come from db
  }

  //const secret = 'afoiu2389u_caiocja;l3?vu80vnqa909jk&claksma';
  const secret = process.env.JWT_SECRET; //create the dotenv

  const options = {
    expiresIn: '1h',
  }
  return jwt.sign(payload, secret, options)
} */

// ENDPOINTS
//get notes
server.get('/api/notes', (req, res) => {
  db('notes')
  .then(notes => res.status(200).json(notes))
  .catch(err => res.status(500).json(err));
})

//addnote
server.post('/api/notes', (req, res) => {
  const note = req.body;

  db('notes')
  .insert(note)
  .then(ids => {id: ids[0]})
  .then(note => {
    res.status(201).json({message: 'Note Added', note});
    })
    .catch(err => {
      res.status(500).json({ message: 'Error inserting note', err });
    });
  });

//view note by id
server.get('/api/notes/:noteid', (req, res) =>{
  const { noteid } = req.params;

  db('notes')
    .where({id: noteid})
    .then(note => res.status(200).json(note))
    .catch(error => res.status(500).json(error))
})


// server working?
server.get('/', (req, res) => {
  res.send('Its Alive!');
});

server.listen(5500, () => console.log('\nrunning on port 5500\n'));