const express = require('express');
const helmet = require('helmet');
const knex = require('knex');
const cors = require('cors');

const dbConfig = require('./knexfile');
const db = knex(dbConfig.development);
const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

server.get('/', (req, res) => {
  res.send('Api running...')
});

server.get('/notes', (req, res) => {
  db('notes').then(notes => {
    res.status(200).json(notes)
  }).catch(err => {
    res.status(500).json({ message: 'Sorry, the server could not be reached'});
  })
});

server.post('/notes', (req, res) => {
  const newNote = req.body;
  console.log(newNote);
  if (newNote.title && newNote.note) {
    db.insert(newNote).into('notes').then(ids => {
      res.status(201).json({ message: 'Your note was successfully added!'})
    }).catch(err => {
      res.status(500).json({ message: 'Sorry, the server could not be reached.'});
    })
  }
  else {
    res.status(400).json({ message: 'Please include both a title and note to proceed'})
  }
});

server.get('/notes/:id', (req, res) => {
  const noteId = req.params.id;
  db('notes').where('id', noteId).first().then(note => {
    res.status(200).json(note);
  }).catch(err => {
    res.status(500).json({ message: 'Sorry, the server could not be reached.'})
  })
});

server.put('/notes/:id', (req, res) => {
  db('notes').where('id', parseInt(req.params.id)).update(req.body).then(ids => {
    res.status(201).json({ message: 'Your note was successfully updated!'})
  }).catch(err => {
    res.status(500).json({ message: 'Sorry, the server could not be reached.'});
  })
});

server.delete('/notes/:id', (req, res) => {
  db('notes').where('id', parseInt(req.params.id)).del().then(id => {
    res.status(201).json({ message: 'Your note was successfully deleted'});
  }).catch(err => {
    res.status(500).json({ message: 'Sorry, the server could not be reached'});
  })
});

server.listen(8700);
