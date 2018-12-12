const secretHidingPlace = require('../secrets/keys')
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const morgan = require('morgan');
const cors = require('cors');
const createNote = require('./createNote');
const editNote = require('./editNote');
const notes = require('./notes');
const db = require('../data/dbConfig');
const dbLogin = require('../data/dbConfigLogin')
const { authenticate } = require('./authenticate');

const secret = secretHidingPlace.jwtKey;

function generateToken(user) {
  const payload = {
    username: user.username,
  };
  const options = {
    expiresIn: '1h',
    jwtid: '12345'
  }
  return jwt.sign(payload, secret, options);
}

function register(req, res) {
  // implement user registration
  const creds = req.body;
  const hash = bcrypt.hashSync(creds.password, 12);
  creds.password = hash;
  dbLogin('users')
    .insert(creds)
    .then(ids => {
      const id = ids[0];
      // find the user using the id
      dbLogin('users')
        .where({ id })
        .first()
        .then(user => {
          const token = generateToken(user);
          res
            .status(201)
            .json({ id: user.id, token })
        })
        .catch(err => res.status(500).send(err));
    })
    .catch(err => res.status(500).send(err));
};

function login(req, res) {
  // implement user login
  const creds = req.body;
  dbLogin('users')
    .where({
        username: creds.username
      })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(creds.password, user.password)) {
        const token = generateToken(user); // generate a token
        // attach that token to the response
        res
          .status(200)
          .json({
            message: `Welcome ${user.username}`,
            token
          })
      } else {
        res
          .status(401)
          .json({
            message: "You shall not pass!!"
          });
      }
    })
    .catch(err => res
                    .status(500)
                    .json({
                      errorMessage: "Sorry, we had some trouble logging you in", 
                      err
                    }));
};

module.exports = server => {
  server.use(express.json());
  server.use(cors());
  server.use(morgan('dev'));
  server.post('/api/login', login);
  server.post('/api/register', register);
  server.use('/api/create', authenticate, createNote);
  server.use('/api/edit', authenticate, editNote);
  server.use('/api/notes', authenticate, notes);
}