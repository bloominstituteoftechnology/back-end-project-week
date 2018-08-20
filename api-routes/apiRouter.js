const express = require('express')
const bcrypt = require('bcrypt');
const cors = require('cors');

const db = require('../data/db.js');
const mw = require('./middleWare/middleWare')

const noteRoutes = require('./routes/note-router.js')

const api = express.Router();

const { protected, generateToken } = mw;

api.use(express.json());
api.use(cors());

api.use('/notes', protected, noteRoutes);

// ---------- Register/Login endpoints -------

api.post('/register', (req, res) => {
  req.body.password = bcrypt.hashSync(req.body.password, 14)

  let { username, password } = req.body;
  let user = {
    username,
    password
  }
  db('users')
    .insert(user)
    .then(ids => {})
    .catch(err => res.status(500).json(err));

    const token = generateToken(user);
    res.status(200).json(token)
});


api.post('/login', (req, res) => {
  let { username, password } = req.body;
  let credentials = {
    username,
    password
  }

  db('users')
  .where('username', credentials.username).first()
  .then(user => {
    if (!user || !bcrypt.compareSync(credentials.password, user.password)) {
      return res.status(401).json({ error: 'invalid username or password' })
    } else {
      const token = generateToken(user)
      return res.send(token);
    }
  })
})


module.exports = api;
