const express = require('express');
const router = express.Router();
const db = require('./notesModel');
const knex = require('../data/dbConfig.js');
const bcrypt = require('bcrypt');

// Notes endpoints
router.get('/test', (req, res) => {
  res.status(200).send('Server Listens and Obeys Maybe???');
});

router.post('/register', (req, res) => {
  console.log(req.body);
  const { username, password } = req.body;
  bcrypt
    .hash(password, 12)
    .then(hash => knex('users').insert({ username, hash }))
    .then(id => {
      res.status(200).json(id);
    })
    .catch(err => {
      console.log('An error occurred', err);
      res.status(400).json({ message: 'We were unable to register this user successfully' });
    });
});

module.exports = router;
