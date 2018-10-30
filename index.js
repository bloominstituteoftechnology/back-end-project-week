const express = require('express');
const cors = require('cors');
const knex = require('knex');

const knexConfig = require('./knexfile');
const db = knex(knexConfig.development);

const server = express();

server.use(express.json());
server.use(cors());

// sanity check
server.get('/', (req, res) => {
  res.send('It is working!');
});

// display a list of notes
server.get('/api/notes', (req, res) => {
  db('notes')
    .then(notes => {
      res.status(200).json(notes);
      console.log(notes);
    })
    .catch(err => {
      res.status(500).json({ error: 'The notes information could not be retrieved.', err });
    })
});

// view an existing note by id
server.get('/api/notes/:id', (req, res) => {
  
  const { id } = req.params;

  db('notes')
    .where({ id })
    .then(note => {
      if (note) {
        res.status(200).json(note);
        console.log(note);
      } else {
        res.status(404).json({ message: 'The note with the specified ID does not exist.' });
      }
    })
    .catch(err => {
      res.status(500).json({ error: 'The notes information could not be retrieved.', err });
    })
});

// create a note with a title and content
server.post('/api/notes', (req, res) => {
  const note = req.body;
  db.insert(note)
    .into('notes')
    .then(id => {
      res.status(201).json(id);
    })
    .catch(err => {
      res.status(500).json({ error: 'There was an error while saving the note to the database.', err });
    })
});


// edit an existing note
server.put('/api/notes/:id', (req, res) => {
  const { id } = req.params;
  const newNote = req.body;
  db('notes')
    .where({ id })
    .update(newNote)
    .then(note => {
      if (!note || note < 1) {
        res.status(404).json({ message: 'The note with the specified ID does not exist.' });
      } else {
        res.status(200).json(note);
      }
    })
    .catch(err => {
      res.status(500).json({ error: 'The note information could not be modified.', err });
    })
});

// delete an existing note
server.delete('/api/notes/:id', (req, res) => {
  const { id } = req.params;
  db('notes')
    .where({ id })
    .del() 
    .then(note => {
      if (!note || note < 1) {
        res.status(404).json({ message: 'The note with the specified ID does not exist.' });
      } else {
        res.status(200).json(note);
      }
    })
    .catch(err => {
      res.status(500).json({ error: "The note could not be removed", err });
    })
});

// listening port
const port = 5000;
server.listen(port, function() {
  console.log(`\n=== Server listening on port ${port} ===\n`);
});