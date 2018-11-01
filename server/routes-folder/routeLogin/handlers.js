const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();

const db = require('../knexConfig.js');

router.post('/', (req, res) => {
  const creds = req.body;
  db('user_table')
    .where({ username: creds.username })
    .first()
      .then(user => {
        if(user && bcrypt.compareSync(creds.password, user.password)) {
          res.status(200).json({ welcome: user.username })
        } else {
          res.status(400).json({ error: 'That username does not exist' })
        };
      })
      .catch(err => {
        res.status(500).json(err);
      });
});

module.exports = router;