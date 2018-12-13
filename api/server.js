const express = require('express');
const server = express();
const db = require('../data/dbConfig');
const cors = require('cors');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

server.use(express.json());
// server.use(cors({ origin: 'http://localhost:3000' }));
server.use(cors({ origin: 'https://lucid-minsky-dfb9d9.netlify.com' })); //netlify

// P R O T E C T E D   M I D D L E W A R E
const protected = (req, res, next) => {
  // token sent in authorization header
  const token = req.headers.authorization;

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
      if (err) {
        // token is no good
        res.status(401).json({ message: 'token is invalid' });
      } else {
        // token is good to go
        res.decodedToken = decodedToken;
        next();
      }
    });
  } else {
    // you didn't even present me a token, man!
    res.status(401).json({ message: 'token not provided!' });
  }
};

// R O O T
server.get('/', (req, res) => {
  res.send('This is testing the deployed API');
});

// G E T   A L L   N O T E S
server.get('/api/notes', protected, (req, res) => {
  db('notes')
    .then(note => res.status(200).json(note))
    .catch(err => res.status(500).json(err));
});

// G E T   B Y   I D
server.get('/api/notes/:id', (req, res) => {
  const { id } = req.params;

  db('notes')
    .where({ id: id })
    .first()
    .then(note => {
      if (note)
        db('notes')
          .where({ id: id })
          .then(note => {
            res.status(200).json(note);
          })
          .catch(err => res.status(500).json(err));
    });
});

// P O S T
server.post('/api/notes', (req, res) => {
  const { title, content } = req.body;
  db('notes')
    .insert({ title, content })
    .then(() => {
      res.status(201).json({ message: 'successfully added note' });
    })
    .catch(err => res.send(err));
});

// E D I T
server.put('/api/notes/:id', (req, res) => {
  const changes = req.body;
  const { id } = req.params;

  db('notes')
    .where({ id: id })
    .update(changes)
    .then(count => {
      res.status(200).json(count);
    })
    .catch(err => res.status(500).json(err));
});

server.delete('/api/notes/:id', (req, res) => {
  const { id } = req.params;

  db('notes')
    .where({ id: id })
    .del()
    .then(count => {
      res.status(200).json(count);
    })
    .catch(err => res.status(500).json(err));
});

// // // // // // // // // // // //
// A U T H E N T I C A T I O N
// // // // // // // // // // // //

// G E N E R A T E   J W T   T O K E N
function generateToken(user) {
  const payload = {
    subject: user.id,
    username: user.username
  };

  const secret = process.env.JWT_SECRET;
  const options = {
    expiresIn: '10m'
  };

  return jwt.sign(payload, secret, options);
}

// L O G I N   R O U T E :   G E N E R A T E   T O K E N
server.post('/api/login', (req, res) => {
  const creds = req.body;

  db('users')
    .where({ username: creds.username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(creds.password, user.password)) {
        const token = generateToken(user);

        res.status(200).json({ message: 'Welcome!', token });
      } else {
        res.status(401).json({ message: 'Invalid login!' });
      }
    })
    .catch(err => res.json(err));
});

// U S E R S   R O U T E :    * P R O T E C T E D *
server.get('/api/users', protected, (req, res) => {
  db('users')
    .select('id', 'username', 'password')
    .then(users => {
      res.json(users);
    })
    .catch(err => res.send(err));
});

// R E G I S T E R   R O U T E
server.post('/api/register', (req, res) => {
  // grab username + password
  const creds = req.body;

  // generate hash
  const hash = bcrypt.hashSync(creds.password, 10);

  // redefine password to the hash
  creds.password = hash;

  // now save the user to the database
  db('users')
    .insert(creds)
    .then(ids => {
      res.status(201).json(ids);
    })
    .catch(err => json(err));
});

module.exports = server;
