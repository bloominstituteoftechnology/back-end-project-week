const express = require('express');
const cors = require('cors');
const secret = 'secreting';
require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const helment = require('helmet');
const db = require('./data/db');
const server = express();

server.use(express.json());
server.use(helment());
server.use(cors());

function generateToken(user) {
  const payload = {
    username: user.username,
  };

  const options = {
    expiresIn: '1h',
    jwtid: '8728391',
  };

  return jwt.sign(payload, secret, options);
}

//! middleware
function protected(req, res, next) {
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token, secret, (err, decodedToken) => {
      if (err) {
        console.log(err)
        return res
          .status(401)
          .json({ error: 'Token is not valid' });
      }
      req.jwtToken = decodedToken;
      next();
    });
  } else {
    //console.log('err2',err)
    return res.status(401).json({ error: 'Token is required' });
  }
}

server.get('/', (req, res) => {
  const nums = [1, 2, 3, 4];
  res.json({ nums });
})

// ! ====================== Login and register ENDPOINTS

//! register
server.post('/api/register', (req, res) => {
  const user = req.body;
  const hash = bcrypt.hashSync(user.password, 14);
  user.password = hash;
  db    
    .insert(user)
    .into('users')
    .then(id => {
      db('users') 
        .then(users => {
          const user = users.pop();
          const token = generateToken(user);
          res.json({ token, username: user.username })
        })
    })
    .catch(err => console.log(err));
});

//! login
server.post('/api/login', function(req, res) {
  const credentials = req.body;
  db('users')
    .where({ username: credentials.username })
    .first()
    .then(function(user) {
      if (user && bcrypt.compareSync(credentials.password, user.password)) {
        const token = generateToken(user);
        res.json({ token, username: user.username })
      } else {
        return res.status(401).json({ error: 'Incorrect Username or Password' });
      }
    })
    .catch(function(error) {
      res.status(500).json({ error });
    });
});

//! get users
server.get('/api/users', (req, res) => {
  db('users')
    .then(users => {
      res.json(users);
    })
    .catch(err => res.send(err));
});


// ! ====================== NOTES ENDPOINTS
server.get('/api/notes', protected, (req, res) => {
  db('notes')
    .then(notes => {
      notes = notes.filter(note => note.username === req.headers.username);
      if (notes.length === 0) {
        res.status(200).json({ notes })
        return;
      } else {
        res.status(200).json({ notes })
        return;
      }
    })
    .catch(err => {
      res.status(500).json({ message: "There was an error in getting notes" })
      return;
    });
})

server.post('/api/notes', protected, (req, res) => {
  const { title, message, username } = req.body;
  if (!title || !message) return res.status(400).json({ message: "Title and message are required" })
  db('notes')
    .insert({ title, message, username })
    .then(result => res.status(201).json({ title, message, username }))
    .catch(() => res.status(500).json({ message: "Note could not be saved" }))
})

server.get('/api/notes/:id', protected, (req, res) => {
  const { id } = req.params;
  db('notes')
    .where({ id })
    .then(note => {
      note = note.filter(note => note.username === req.headers.username);
      res.status(200).json(note);
    })
    .catch((err) => res.status(500).json(err));
});

server.delete('/api/notes/:id', protected, (req, res) => {
  const { id } = req.params;
  db('notes')
    .where({ id })
    .del()
    .then(id => {
      res.status(200).json({ id });
    })
    .catch((err) => res.status(500).json(err));
});

server.put('/api/notes/:id', protected, (req, res) => {
  const { id } = req.params;
  const { title, message } = req.body;
  db('notes')
    .where({ id })
    .update({ title, message })
    .then(id => {
      res.status(200).json(id);
    })
    .catch((err) => res.status(500).json(err));
});

const port = process.env.PORT || 8000;
server.listen(port, () => {
  console.log(`API running on port ${port}`);
});