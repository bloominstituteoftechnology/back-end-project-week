const express = require('express');
const helmet = require('helmet');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const knex = require('knex');

const server = express();
const port = 8000;

const secret = 'the best secret ever'

const dbConfig = require('./knexfile');
const db = knex(dbConfig.development);

server.use(express.json());
server.use(cors());
server.use(helmet());


// middleware
// create urlId for notes/:id


function generateToken(user) {
  const payload = {
    username: user.username,
  };
  const options = {
    expiresIn: '7d',
    jwtid: '6145112653564465145145'
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
    res.status(401).json({ message: 'No Token Provided' });
  }
}



server.get('/', (req, res) => {
  res.send('API Running...');
});


server.post('/register', (req, res) => {

  !req.body.username || !req.body.password ?
  res.status(400).json({message: 'You need a username AND password'})
  :
  null

  const creds = req.body;
  const hash = bcrypt.hashSync(creds.password, 11);
  creds.password = hash;
  db('users')
    .insert(creds)
    .then(ids => {
      const id = ids[0];
      
      db('users')
      .where({ userId: id })
      .first()
      .then(user => {
          const token = generateToken(user);
          res.status(201).json({ id: user.userId, username: user.username, token });
        })
        .catch(err => res.status(500).json({message: 'Unable to generate token'}));
    })
    .catch(err => res.status(500).json({message: 'Unable to insert credentials'}));
});


server.post('/login', (req, res) => {
  const creds = req.body;

  db('users')
    .where({ username: creds.username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(creds.password, user.password)) {
        const token = generateToken(user);

        res.status(200).json({ token, username: user.username });
      } else {
        res.status(401).json({ message: 'Invalid Token' });
      }
    })
    .catch(err => res.status(500).json({message: 'Unable to retrieve user'}));
});



/* WHERE I AM ATTEMPTING DOUBLE JOIN */
server.get('/protected/notes', protected, (req, res) => {
  const { username } = req.user;

  db('users')
    .select()
    .join('notes', 'users.userId', 'notes.userId')
    //.join('tags', 'notes.noteId', 'tags.noteId')
    .where({username})
    .then(users => {
      console.log(users)
      res.status(200).json(users)
    })
    .catch(err => res.send(err));
});






/* Some tests */
server.get('/users', (req, res) => {

  db('users')
    .select()
    .then(users => {
      res.status(200).json(users)
    })
    .catch(err => res.send(err));
});


server.get('/notes', (req, res) => {

  db('notes')
    .select()
    .then(users => {
      res.status(200).json(users)
    })
    .catch(err => res.send(err));
});


server.listen(port, () => console.log(`~~ Listening on Port ${port} ~~`));
