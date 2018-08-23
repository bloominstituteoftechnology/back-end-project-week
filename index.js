require('dotenv').config();

const db = require('./data/db');
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const server = express();
server.use(helmet());
server.use(express.json());

server.use(cors());

server.get('/', (req, res) => {
  req.send('hello world');
});

server.get('/notes', (req, res) => {
  db('notes')
    .then((notes) => {
      res.status(200).json(notes);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

server.get('/notes/:id', (req, res) => {
  const { id } = req.params;
  db('notes')
    .where({ id })
    .then((note) => {
      res.status(200).json(note);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

server.post('/notes', (req, res) => {
  const note = req.body;
  if (!note.title || !note.textBody)
    res.status(400).json({ errorMessage: 'Provide a title and text please' });
  db('notes')
    .insert(note)
    .then((ids) => {
      const id = ids[0];
      res.status(201).json({ id, ...note });
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

server.put('/notes/:id', (req, res) => {
  const { id } = req.params;
  const note = req.body;
  console.log(req.body);
  // req is request obj coming from the client
  // req.body.note is coming from the client
  db('notes')
    .where({ id })
    .update(note)
    .then(() => {
      res.status(201).json(note);
    })
    .catch((err) => res.status(500).json(err));
});

server.delete('/notes/:id', (req, res) => {
  const { id } = req.params;
  db('notes')
    .where({ id })
    .del()
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((err) => res.status(500).json(err));
});

const port = process.env.PORT || 8000;
server.listen(port, () => {
  console.log(`server on http://localhost:${port}`);
});
