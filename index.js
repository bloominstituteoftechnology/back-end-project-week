require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const db = require('./data/db');

const server = express();
server.use(helmet());
server.use(express.json());
server.use(cors());
const PORT = process.env.PORT || 8000;

server.get('/', (req, res) => {
  const secret = process.env.SECRET;
  const message = 'Hey Hey Hey'
  res.status(200).json({secret, message});
});

server.post('/api/notes/create', (req, res) => {
  const note = req.body;
  db.insert(note).into('notes')
    .then(response => {
      res.status(201).json(response);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

server.get('/api/notes/get/all', (req,res) => {
  db('notes')
    .then(response => {
      res.status(200).json(response);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

server.get('/api/notes/:id', (req, res) => {
  const id = req.params.id;
  db('notes').where('id', id)
    .then(response => {
      res.status(200).json(response);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

server.put('/api/notes/edit/:id', (req, res) => {
  const id = req.params.id;
  const note = req.body;
  db('notes').where('id', id).update(note)
    .then(response => {
      res.status(200).json(response);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

server.delete('/api/notes/delete/:id', (req, res) => {
  const id = req.params.id;
  db('notes').where('id', id).del()
    .then(response => {
      res.status(200).json(response);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

server.listen(PORT, () => {
  console.log(`UP and RUNNING on ${PORT}`)
});