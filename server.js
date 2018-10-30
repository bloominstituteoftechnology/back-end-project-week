const express = require('express');
const db = require('./data/db');
const cors = require('cors');

const server = express();
server.use(express.json());
server.use(cors());

// server operations

// general API test GET

server.get('/api', (req, res) => {
  res.send('Server functioning correctly!');
});

// simple GET request for all notes

server.get('/api/notes', (req, res) => {
  db('notes')
    .then(notes => {
      res.status(200).json(notes);
    })
    .catch(err => {
      console.log(err.message);
      res.status(500).json({ error: "Unable to retrieve notes at this time." });
    });
});

// GET request for an individual note

server.get('/api/notes/:id', (req, res) => {
  const { id } = req.params;

  db('notes')
    .where('id', id)
    .then(note => {
      if (!note.length) {
        res
          .status(401)
          .json({ error: 'Invalid ID! Please try again.' });
      } else
      res.status(200).json(note)
    })
    .catch(err => {
      console.log(err.message);
      res.status(500).json({ error: 'The note could not be retrieved.' });
    });
});

// POST a new note

server.post('/api/notes', (req, res) => {
  const { title, content } = req.body;
  const newNote = { title, content };

  db.insert(newNote)
    .into('notes')
    .then(added => {
      res
        .status(201)
        .json({ message: 'Note successfully added to database!' })
    })
    .catch(err => {
      res
        .status(500).json({ error: 'An error was encountered while adding the note.' });
        console.log(err.message);
    });
});

// DELETE a note via ID

server.delete('/api/notes/:id', (req, res) => {
  const { id } = req.params;

  db('notes')
    .where({id})
    .del()
    .then(deleted => res.status(200).json({ message: 'The note was successfully deleted. </3 '}))
    .catch(err => res.status(500).json({ error: 'An error was encountered while deleting this note.' }));
});

// edit an existing note, ID should remain the same

server.put('/api/notes/:id', (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  const note = { title, content };

  db('notes')
    .where({id})
    .update(note)
    .then(updated => res.status(200).json({ message: 'The note was successfully edited! '}))
    .catch(err => res.status(500).json({ error: 'An error was encountered while editing this note.' }));
});

// server instantiation

const port = 8000;
server.listen(port, () => console.log(`Server listening on port ${port}.`));
