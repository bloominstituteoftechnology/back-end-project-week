const express = require('express');
const bcrypt = require('bcryptjs');

const db = require('../data/dbConfig.js');

const generateToken = require('../authFunctions/generateToken.js');

const router = express.Router();

router.post('/', (req, res) => {
    const creds = req.body;
  
    db('users')
      .where({ email: creds.email })
      .first()
      .then(user => {
        if (user && bcrypt.compareSync(creds.password, user.password)) {
          const token = generateToken(user)
          res.status(200).json(token);
        } else {
          res.status(401).json({ message: 'you shall not pass!!' });
        }
      })
      .catch(err => res.json(err));
  });

  module.exports = router;
