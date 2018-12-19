const express = require('express');
const router = express.Router();
const db = require('./notesModel');
const knex = require('../data/dbConfig.js');
const morgan = require('morgan');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv').config();
const cors = require('cors');

const secret = process.env.SECRET || 'secretWithSevenSssssss';

// Login endpoints
router.get('/logintest', (req, res) => {
  res.status(200).send('Server Might Log you in');
});

router.post('/login', (req, res) => {
  const { username, password } = req.body;
  knex('users')
    .select('hash', 'id')
    .where('username', '=', username)
    .first()
    .then(({ hash }) => {
      return bcrypt.compare(password, hash);
    })
    .then(verdict => {
      if (verdict) {
        const token = jwt.sign({ username }, secret, { expiresIn: '24h' });
        knex('users')
          .select('id')
          .where('username', '=', username)
          .first()
          .then(({ id }) => {
            res.status(200).json({ id, token });
          });
      } else {
        res.status(406).json({ message: 'System could not log user in.' });
      }
    })
    .catch(err => {
      console.log('An error occurred', err);
      res.status(400).json({ message: 'An error occurred when attempting log-in.' });
    });
});

module.exports = router;
