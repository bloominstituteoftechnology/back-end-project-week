const express = require('express');
const router = express.Router();

const User = require('../src/users/User');

router.route('/')
  .get((req, res) => {
    User.find({})
      .then(users => {
        if (!users) {
          res.status(422).json({ error: "No users found"})
        } else {
          res.status(200).json(users)
        }
      })
      .catch(err => res.send({ error: err }));
  });
  
  
router.route('/register')
  .post((req, res) => {
    const newUser = req.body;
    
    User.create(newUser)
      .then(newUser => {
        res.status(201).json(newUser)
      })
      .catch(err => res.send({ error: err }));
  });


module.exports = router;