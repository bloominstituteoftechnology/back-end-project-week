const express = require('express');
const bcrypt = require('bcryptjs');

const db = require('../data/dbConfig.js');

const router = express.Router();

router.post('/', (req, res) => {
    const creds = req.body;
  
    const hash = bcrypt.hashSync(creds.password, 12);
  
    creds.password = hash;
  
    db('users')
      .insert(creds)
      .then(ids => {
        res.status(201).json(ids);
      })
      .catch(err => res.status(500).json({message: `An error occured: ${err}`}))
  });

  module.exports = router;