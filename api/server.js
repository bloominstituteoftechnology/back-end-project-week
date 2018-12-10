const express = require('express');

const knex = require('knex');
const knexConfig = require('../knexfile.js');
const db = knex(knexConfig.development);

const server = express();

server.use(express.json());

// sanity check endpoint
server.get('/', (req, res) => {
    res.status(200).json({ api: 'up and running' });
});

//GET a list of notes
server.get('/api/notes', (req, res) => {
    db('notes')
      .then(notes => res.status(200).json(notes))
      .catch(err => res.status(500).json(err));
});

//GET note by id 
server.get('/api/notes/:noteId', (req, res) => {
    const { noteId } = req.params;
    
    db('notes')
      .where({ id: noteId})
      .first()
      .then(note => {
        if (!note) {
            res.status(404).json({ message: 'A note with that ID was not found.' });
        } else {
            res.status(200).json(note);
        }
    })
    .catch(err => {
        res.status(500).json({ error: 'There was an error getting the note.', err });
    });
});

//POST a note with title & content
server.post('/api/notes', (req, res) => {
    const note = req.body;
  
    db('notes')
      .insert(note)
      .returning('id')
      .then(ids => {
        res.status(201).json({message: "added note with the id of", ids});
      })
      .catch(err => {
        res.status(500).json({ message: 'Error inserting', err });
      });
  });



module.exports = server;