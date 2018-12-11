require('dotenv').config();
const express = require('express');
const knex = require('knex');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const knexConfig = require('../knexfile.js');
const db = knex(knexConfig.development);
const cors = require('cors');

// Add middleware nameChecker
const titleTextChecker = require('../middleware/titleTextChecker.js');
const logInChecker = require('../middleware/logInChecker.js');

const server = express();
server.use(express.json());
server.use(cors());


function generateToken(user) {

  const payload = {
    userId: user.userId,
    username: user.username,
    department: 'product' // this will come from database
  }
  // const secret = 'anySecret($&*#$%#%#$%#$)';
  const secret = process.env.JWT_SECRET; // added to .env file
  const options = {
    expiresIn: '1hr',
  }
  return jwt.sign(payload, secret, options); // take 3 arguments
}

server.post('/register', (req, res) => {
  // 1. grab username and password from body
  // 2. generate the hash from the user's password
  // 3. override the user.password with the hash
  // 4. save the user to the database
  const creds = req.body;
  const hash = bcrypt.hashSync(creds.password, 14)
  creds.password = hash;
  console.log(creds, hash)
  db('users')
    .insert(creds)
    .then(ids => {
      res.status(201).json({ user_id: ids[0]});
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ message: 'Error inserting', err })
    })
})

server.post('/login', (req, res) => {
  const creds = req.body;

  db('users')
    .where({ username: creds.username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(creds.password, user.password) ) {
        // user exists and password match
        const token = generateToken(user)
        res.status(200).json({ message: 'Logged in', user: user.username, token})
      } else {
        res.status(401).json({ message: 'Try logging in again.' });
      }
    })
})



// TABLE SCHEMA
//  "id": 
//  "tags": ["tag", "otherTag"],
//  "title": "Note Title",
//  "textBody": "Note Body",

// ENDPOINTS

// endpoints here

//  Get All: "/" 
//  Post: '/CreateNewView' changed to CreateNewView
//  Get Note by id '/note/:id'
//  Edit Note by id = '/note/edit/:id'
//  Delete Note by id = '/note/delete/:id'

// NOTES
// POST: .insert() 
server.post('/note/add', titleTextChecker, (req, res) => {
  const { title, textBody, id } = req.body;
  const noteId = { id };
  db('notes')
    .insert({ title, textBody })
    .then(ids => {
      res.status(201).json({ id: ids[0] });
    })
    .catch(err => {
      res.status(500).json({
        message: 'Error inserting',
        err
      })
    })
})


// GET (assumes .select())
server.get('/note/get/all', (req, res) => {
  // console.log(req)
  db('notes')
    //.select()
    .then(notes => res.status(200).json(notes))
    .catch(err => res.status(500).json({
      err
    }));
});

// GET (assumes .select() .where id matches)
server.get('/note/get/:id', (req, res) => {
  const { id } = req.params;
  console.log(id, req.params.id)
  db('notes')
    .where({ id: id })
    .then(notes =>
      notes[0] ?
      res.status(200).json(notes[0]) :
      res.status(404).json({
        error: "there is no note with that id",
        "log": console.log(id)
      })
    )
    .catch(err => res.status(500).json({
      err
    }));
});

//PUT check changes, request changes, and .where ids match .update changes
server.put('/note/edit/:id', titleTextChecker, (req, res) => {
  const changes = req.body;
  const { id } = req.params;
  db('notes')
    .where({ id: id }) // 
    .update(changes)
    .then(count => {
      res.status(200).json({
        title: changes.title,
        textBody: changes.textBody
      });
    })
    .catch(err => res.status(500).json(err));
});

// DELETE .del .where ids match
server.delete('/note/delete/:id', (req, res) => {
  const { id } = req.params;

  db('notes')
    .where({ id: id })
    .del()
    .then(count => {
      res.status(200).json({ count });
    })
    .catch(err => res.status(500).json(err));
});







server.get('/api', (req, res) => {
  res.json({ api: 'Lambda Notes (Backend): running' });
});

module.exports = server;



