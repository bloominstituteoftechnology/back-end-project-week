const express = require('express');
const knex = require('knex');

const dbConfig = require('./knexfile');

const db = knex(dbConfig.development);

const server = express();

server.use(express.json());


server.get('/', (req, res) => {
    res.send('API Running...');
});

server.get('/api/notes', (req, res) => {
    db('notes').then(notes => {
      res.status(200).json(notes)
    }).catch(err => {
      res.status(500).json({ message: 'Error retrieving notes'});
    })
  });

  server.get('/api/notes/:id', (req, res) => {
    const { id }  = req.params; 
    db('notes')
        .where('id', id)
        .then(note => {
        res.status(200).json(note); 
    }).catch(err => {
        res.status(500).json({message: "Error getting project"})
    })
});

server.post('/api/notes', (req, res) => {
const note = req.body;
  db.insert(note).into('notes').then(response => {
    res.status(201).json({ message: 'New note successfully created'})
  }).catch(err => {
    res.status(500).json({ message: 'Error creating note'});
  })
});

server.listen(8000);