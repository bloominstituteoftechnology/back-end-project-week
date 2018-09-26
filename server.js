const express = require('express');
const helmet = require('helmet');
const knex = require('knex');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const dbConfig = require('./knexfile');

const db = knex(dbConfig.development);

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

//auth
const secret = 'secret';

function generateToken(user) {
  const payload = {
    username: user.username
  };
  const options = {
    expiresIn: '1h',
    jwtid: '12345',
  };
  return jwt.sign(payload, secret, options);
}

function protected(req, res, next) {
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token, secret, (err, decodedToken) => {
      if (err) {
        res.status(401).json({ message: 'Invalid Token' });
      } else {
        req.user = { username: decodedToken.username };
        next();
      }
    });
  } else {
    res.status(401).json({ message: 'no token provided' });
  }
}

server.post('/api/register', (req, res) => {
    const creds = req.body;
    const hash = bcrypt.hashSync(creds.password, 10);
    creds.password = hash;
    db('users')
      .insert(creds)
      .then(ids => {
        const id = ids[0];
        db('users')
          .where({ id })
          .first()
          .then(user => {
            const token = generateToken(user);
            res.status(201).json({ id: user.id, token });
          })
          .catch(err => {
            console.log(err);
            res.status(500).send(err)});
      })
      .catch(err => {
        console.log(err);
        res.status(500).send(err)});
  });
  
  server.post('/api/login', (req, res) => {
    const creds = req.body;
    db('users')
      .where({ username: creds.username })
      .first()
      .then(user => {
        if (user && bcrypt.compareSync(creds.password, user.password)) {
          const token = generateToken(user);
          res.status(200).json({ token });
        } else {
          res.status(401).json({ message: 'Incorrect username or password.' });
        }
      })
      .catch(err => res.status(500).send(err));
  });

//endpoints
server.get('/', (req, res) => {
  res.send('API running; deployment success!')
});

server.post('/api/notes', protected, (req, res) => {
    const note = req.body;
    if (!note.title || !note.textBody) {
        res.status(400).json({ error: "Please provide a title and body for the note." })
    } else
        db.insert(note)
        .into('notes')
        .then(ids => {
        res.status(201).json(ids);
        })
        .catch(err => res.status(500).json({ error: "There was an error saving the note." }))
});

server.get('/api/notes', protected, (req, res) => {
    db('notes')
    .then(notes => {
        res.status(200).json(notes);
    })
    .catch(err => res.status(500).json(err));
});

server.get('/api/notes/:id', protected, (req, res) => {
    const {id} = req.params;
    db('notes').where({ id: id }).first()
    .then(async note => {
        if (!note) {
        res.status(404).json({ message: "The note with the specified ID does not exist." });
        } else {
            res.status(200).json(note);
        }
    })
    .catch(err => res.status(500).json(err));
});

server.put('/api/notes/:id', protected, (req, res) => {
    const {id} = req.params;
    const note = req.body;
    if (!note.title || !note.textBody) {
        res.status(400).json({ error: "Please provide a title and body for the note." })
    } else
        db('notes').where({ id: id }).update(note)
        .then(count => {
        if (count) {
            res.status(200).json({ message: "The note was successfully updated." });
        } else {
            res.status(404).json({ message: "The note with the specified ID does not exist." });
        }
        })
        .catch(err => res.status(500).json(err));
});

server.delete('/api/notes/:id', protected, (req, res) => {
    const {id} = req.params;
    db('notes').where({ id: id }).del()
    .then(count => {
        if (count) {
        res.status(204).end();
        } else {
        res.status(404).json({ message: "The note with the specified ID does not exist." });
        }
    })
    .catch(err => res.status(500).json(err));
});


module.exports = {
    server,
  };
  