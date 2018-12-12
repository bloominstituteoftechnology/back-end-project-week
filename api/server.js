const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const db = require('../data/dbConfig.js');

const server = express();

server.use(cors());
server.use(express.json());

function generateToken(user) {
  const payload = {
    subject: user.id,
    username: user.username,
  }
  const secret = process.env.JWT_SECRET;
  const options = {
    expiresIn: '1hr'
  }
  return jwt.sign(payload, secret, options)
}

server.post('/api/register', (req, res) => {
  const creds = req.body;

  const hash = bcrypt.hashSync(creds.password, 10);

  creds.password = hash;

  db('users').insert(creds).then(id => {
    res.status(201);
  }).catch(err => res.status(420).json(err));
});


server.post('/api/login', (req, res) => {
  const creds = req.body;
  db('users')
    .where({
      username: creds.username
    })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(creds.password, user.password)) {
        const token = generateToken(user);
        res.status(200).json(token);
      } else {
        res.status(401).json({
          message: 'You Shall Not Pass!!!!'
        })
      }
    }).catch(err => res.status(404).json(err))
});
server.get('/api/users', (req, res) => {
  db('users')
    .select('id', 'username', 'password')
    .then(users => {
      res.status(420).json(users);
    })
    .catch(err => res.send(err));
});

server.get('/', (req, res) => {
  res.status(200).json({
    api: "Up and Running"
  })
});

server.get('/api/notes', (req, res) => {
  db('notes')
    .then(notes => res.status(200).json(notes))
    .catch(err => res.status(500).json(err));
});

server.post('/api/notes', (req, res) => {
  const note = req.body;

  db('notes')
    .insert(note)
    .then(ids => {
      res.status(201).json(ids);
    })
    .catch(err => {
      res.status(500).json({
        message: 'Error inserting',
        err
      });
    });
});

server.get('/api/notes/:noteId', (req, res) => {
  const {
    noteId
  } = req.params;

  db('notes')
    .where({
      _id: noteId
    })
    .first()
    .then(note => {
      res.status(200).json(note);
    })
    .catch(err => res.status(500).json(err));
});

server.put('/api/notes/:noteId', (req, res) => {
  const changes = req.body;
  const {
    noteId
  } = req.params;

  db('notes')
    .where({
      _id: noteId
    })
    .update(changes)
    .then(count => {
      res.status(200).json({
        count
      });
    })
    .catch(err => res.status(500).json(err));
});

server.delete('/api/notes/:noteId', (req, res) => {
  const {
    noteId
  } = req.params;

  db('notes')
    .where({
      _id: noteId
    })
    .del()
    .then(count => {
      res.status(202).json({
        count
      });
    })
    .catch(err => res.status(500).json(err));
});

module.exports = server;