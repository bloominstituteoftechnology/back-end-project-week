const express = require('express');
const cors = require('cors');
const secret = 'secret';
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('./data/db');
const server = express();

server.use(express.json());
server.use(cors({origin: 'http://localhost:3000', credentials:true}));

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

server.get('/', (req, res) => {
  res.send('Running....');
});

//! middleware
function protected(req, res, next) {
  const token = req.headers.authorization;
  console.log(token)
  if (token) {
    jwt.verify(token, secret, (err, decodedToken) => {
      if (err) {
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

// ! ====================== NOTES ENDPOINTS

//! register
server.post('/api/register', (req, res) => {
  const user = req.body;
  const hash = bcrypt.hashSync(user.password, 14);
  user.password = hash;
  console.log(user)
  db    
    .insert(user)
    .into('users')
    .then(id => {
      db('users') 
        .then(users => {
          console.log(users)
          const user = users.pop();
          const token = generateToken(user);
          res.send(token);
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
        res.send(token);
      } else {
        return res.status(401).json({ error: 'Incorrect Username or Password' });
      }
    })
    .catch(function(error) {
      res.status(500).json({ error });
    });
});

//! get users
server.get('/api/users', protected, (req, res) => {
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
      if (notes.length === 0) {
        res.status(404).json({ message: "notes could not be found" })
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

server.post('/api/notes', (req, res) => {
  const { title, message } = req.body;
  if (!title || !message) return res.status(400).json({ message: "Title and message are required" })
  db('notes')
    .insert({ title, message })
    .then(result => res.status(201).json({ title, message }))
    .catch(() => res.status(500).json({ message: "Note could not be saved" }))
})

server.get('/api/notes/:id', (req, res) => {
  const { id } = req.params;
  db('notes')
    .where({ id })
    .then(note => {
      res.status(200).json(note);
    })
    .catch((err) => res.status(500).json(err));
});

server.delete('/api/notes/:id', (req, res) => {
  const { id } = req.params;
  db('notes')
    .where({ id })
    .del()
    .then(id => {
      res.status(200).json({ id });
    })
    .catch((err) => res.status(500).json(err));
});

server.put('/api/notes/:id', (req, res) => {
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


server.listen(8000, () => {
  console.log('API running on port 8000')
});