const express = require('express');
const cors = require('cors');
const server = express();
const db = require('../data/dbConfig.js');
const morgan = require('morgan');

const port = process.env.PORT || 9000;

server.use(express.json());
server.use(cors());
server.use(morgan('dev'));

//Sanity Check
server.get('/', (req, res) => {
  res.send(`Api running on port: ${port}`);
});

//get all of the notes
server.get('/api/notes', (req, res) => {
  db('notes')
    .then(list => {
      res.status(200).json(list);
    })
    .catch(err => {
      res.status(500).json({ error: "Couldn't retrieve the notes.", err });
    });
});

//view a single note
server.get('/api/notes/:id', (req, res) => {
  const { id } = req.params;
  db('notes')
    .where({ id: id })
    .then(note => {
      if (note) {
        res.status(200).json(note);
      } else {
        res.status(404).json({ error: "That note doesn't exist" });
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: 'The requested note could not be retrieved.', err });
    });
});

//delete a note by id
server.delete('/api/notes/:id', (req, res) => {
  const { id } = req.params;
  db('notes')
    .where({ id: id })
    .del()
    .then(count => {
      res.status(200).json({ count });
    })
    .catch(err => {
      res.status(500).json({ error: 'This note could not be deleted.', err });
    });
});

//create a note with title and content
server.post('/api/notes', (req, res) => {
  let { title, body } = req.body;

  console.log(req.body);
  db('notes')
    .insert({ title, body })
    .then(ids => ids[0])
    .then(id => {
      db('notes')
        .where({ id })
        .first()
        .then(note => {
          res.status(201).json(note);
        });
    })
    .catch(err => {
      res.status(500).json({ error: 'This note could not be created.', err });
    });
});

//edit an existing note
server.put('/api/notes/:id', (req, res) => {
  const { title, body } = req.body;
  const { id } = req.params;
  db('notes')
    .where({ id: id })
    .update({ title, body })
    .then(newNote => {
      db('notes')
        .where({ id })
        .first()
        .then(note => {
          res.status(201).json(note);
        });
    })
    .catch(err => {
      res.status(500).json({ error: 'The note could note be updated.', err });
    });
});

module.exports = server;
