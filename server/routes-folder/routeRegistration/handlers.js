const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();

const db = require('../knexConfig.js');

router.post('/', (req, res) => {
  const creds = req.body;
  const hash = bcrypt.hashSync(creds.password, 14);
  creds.password = hash;

  db('users_table')
    .insert(creds)
      .then(ids => {
        const id = ids[0];
        res.status(200).json({ newUserId: id });
      })
      .catch(err => {
        res.status(500).json(err);
      });
});

module.exports = router;