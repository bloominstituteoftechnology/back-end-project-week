
const express = require("express");
const knex = require("knex");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const knexConfig = require("./knexfile.js");

const db = knex(knexConfig.development);

const server = express();

const cors = require('cors');

server.use(cors());

server.use(express.json());



//------------Notes----------------

// GET

server.get("/api/notes", (req, res) => {
    db("notes")
      .then(notes => {
          res.status(200).json(notes)
      })
      .catch(err => {
          res.status(500).json(err)
      });
  });

  
  // GET BY ID
  
  server.get("/api/notes/:id", (req, res) => {
    const { id } = req.params;
    db("notes")
      .where({ id: id})
      .then(notes => {
          res.status(200).json(notes)
      })
      .catch(err => {
          res.status(500).json(err)
      });
  });
  

// POST

server.post("/api/notes/post", (req, res) => {
    const notes = req.body;

    db("notes")
      .insert(notes)
      .into("notes")
      .then(ids => {
          res.status(201).json({ids})
      })
      .catch(err => {
          res.status(500).json({ error: err })
      });
  });

  // UPDATE

server.put("/api/notes/edit/:id", (req, res) => {
    const changes = req.body;
    const {id} = req.params;
    db("notes")
      .where({ id: id })
      .update(changes)
      .then(count => {
          res.status(200).json(count)
      })
      .catch(err => res.status(500).json({ error: err }));
  });

// DELETE

server.delete("/api/notes/delete/:id", (req, res) => {
    const { id } = req.params;
    db("notes")
      .where({id:id})
      .del()
      .then(ids => {
          res.status(200).json(ids)
      })
      .catch(err => {
          res.status(500).json({ error: err })
      });
  });

  function generateToken(user) {
    const payload = {
      subject: user.id,
      username: user.username,
    };
  
    const secret = process.env.JWT_SECRET;
    const options = {
      expiresIn: '60m', //time changed here before another login attempt is needed
    };
  
    return jwt.sign(payload, secret, options);
  }

  // LOGIN
  
  server.post('/api/notes/login', (req, res) => {
    const creds = req.body;
  
    db('users')
      .where({ username: creds.username })
      .first()
      .then(user => {
        if (user && bcrypt.compareSync(creds.password, user.password)) {
          const token = generateToken(user);
          res.status(200).json({ message: 'Welcome!', token });
        } else {
          res.status(401).json({ message: 'Get Out!!' });
        }
      })
      .catch(err => res.json(err));
  });
  
  function protected(req, res, next) {
    const token = req.headers.authorization;
  
    if (token) { // is valid
      jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
        if (err) { // is invalid
          res.status(401).json({ message: 'invalid token' });
        } else { // token is good
          req.decodedToken = decodedToken;
          next();
        }
      });
    } else { //bounced
      res.status(401).json({ message: 'no token provided' });
    }
  }
  
  //protect this route! Authenticate users only!
  server.get('/api/notes/users', protected, checkRole('sales'), (req, res) => {
    db('users')
      .select('id', 'username', 'password')
      .then(users => {
        res.json(users);
      })
      .catch(err => res.send(err));
  });
  

  
  function checkRole(role) {
    return function(req, res, next) {
      if (req.decodedToken && req.decodedToken.roles.includes(role)) {
        next();
      } else {
        res.status(403).json({ message: 'you have no access to this resource' });
      }
    };
  }
  
// REGISTER

  server.post('/api/notes/register', (req, res) => {
    const creds = req.body;
    const hash = bcrypt.hashSync(creds.password, 4); 
    creds.password = hash; 
    db('users')
      .insert(creds)
      .then(ids => {
        res.status(201).json(ids);
      })
      .catch(err => json(err));
  });


server.listen(8000, () => console.log("\n== Port 8k ==\n"));