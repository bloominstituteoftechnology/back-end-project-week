const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const knex = require('knex');
const knexConfig = require('./knexfile.js');

const db = knex(knexConfig.development);

const server = express();

server.use(express.json());
server.use(morgan('dev'));
server.use(cors());

server.get('/', (req, res) => {
  res.send('API UP');
});

server.get('/api/notes', (req, res) => {
  db('notes')
    .then(notes => {
      // Expects an array of notes to be sent
      res.status(200).json(notes);
    })
    .catch(error => {
      res
        .status(500)
        .json({ message: 'There was an error getting your notes', error });
    });
});

server.get('/api/notes/:id', (req, res) => {
  const { id } = req.params;

  db('notes')
    .where('id', id)
    .then(note => {
      // Expects the specific note to be sent
      res.status(200).json(note);
    })
    .catch(error => {
      res
        .status(500)
        .json({ message: 'There was an error getting your note', error });
    });
});

server.post('/api/notes', (req, res) => {
  const note = req.body;

  db('notes')
    .insert(note)
    // The then will send back the id of the note added
    .then(id => res.status(201).json(id))
    .catch(error =>
      res
        .status(500)
        .json({ message: 'There was an error adding your note', error })
    );
});

server.delete('/api/notes/:id', (req, res) => {
  const { id } = req.params;

  db('notes')
    .where('id', id)
    .del()
    .then(response => res.status(200).json(response))
    .catch(error =>
      res
        .status(500)
        .json({ message: 'There was an error deleting your note', error })
    );
});

server.put('/api/notes/:id', (req, res) => {
  const { id } = req.params;
  const updatedNote = req.body;

  db('notes')
    .where('id', id)
    .update(updatedNote)
    // Expects a 1 sent if update is successful
    .then(() => {
      updatedNote.id = Number.parseFloat(id);
      res.status(200).json(updatedNote);
    })
    .catch(error =>
      res
        .status(500)
        .json({ message: 'There was an error updating your note', error })
    );
});
module.exports = server;
