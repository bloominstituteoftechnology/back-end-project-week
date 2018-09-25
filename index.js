const express = require('express');
const cors = require('cors');
const server = express();
const knex = require('knex');
const dbConfig =require('./knexfile')
const db = knex(dbConfig.development)
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');

server.use(express.json());
server.use(cors());

const secret = 'you will never know'

generateToken = (user) => {
  const payload = {
    username: user.username,
  };
  const options = {
    expiresIn: '1h',
    jwtid: '12345', 
  };
  return jwt.sign(payload, secret, options);
};

protected = (req, res, next) => {
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

server.post('/api/register', (req, res) =>{
  const creds = req.body;
  const hash = bcrypt.hashSync(creds.password, 10)
  creds.password = hash;
  db('users')
    .insert(creds)
    .then(ids => {
      const id = ids[0]
      db('users')
        .where({ id })
        .first()
        .then(user => {
          const token = generateToken(user);
          res.status(201).json({ id: user.id, token });
        }).catch(err => res.status(500).send(err));
    }).catch(err=> res.status(500).send(err))
})

server.post('/api/login', (req, res) => {
  const creds = req.body;  
  db('users')
    .where({username: creds.username})
    .first()
    .then(user =>{
      if (user && bcrypt.compareSync(creds.password, user.password)){
        const token = generateToken(user);
        res.status(200).send({token})
      } else {
        res.status(401).json({message: 'The username or password incorrect.'})
      }
    })
})

server.get('/api/users', (req, res) => {    
  db('users')
      .select('id', 'username')
      .then(users => {
          res.json(users);
      })
      .catch(err => res.send(err));    
});

server.get('/api/notes', protected, (req, res) => {
  db('notes')
    .then(notes=>{
      res.status(200).json(notes)
    }).catch(err => res.status(500).json({ error: "Unable to retrieve."}))
});

server.get('/api/notes/:id', protected,  (req, res) => {
  const { id } =req.params;
  db('notes')
    .where({ id })
    .then(notes=>{
      res.status(200).json(notes)
    })
    .catch(err => res.status(500).json({ error: "Unable to retrieve."}))
})

server.post('/api/notes', protected, (req, res) => {
  const note = req.body;
  db.insert(note)
    .into('notes')
    .then(ids => {
      res.status(201).json(ids)
    }).catch(err => res.status(500).json({ error: "Unable to retrieve."}))
})

server.put('/api/notes/:id', protected, (req, res) => {
  const { id } =req.params;
  db('notes')
    .where({ id })
    .update(req.body)
    .then(notes=>{
      res.status(200).json(notes)
    })
    .catch(err => res.status(500).json({ error: "Unable to retrieve."}))
})

server.delete("/api/notes/:id", protected, async (req, res) => {
  const { id } =req.params;
  db('notes')
    .where({ id })
    .del()
    .then(notes=>{
      res.status(200).json(notes)
    })
    .catch(err => res.status(500).json({ error: "Unable to retrieve."}))
});



server.listen(5000, () => {
  console.log('Server listening on 5000');
});