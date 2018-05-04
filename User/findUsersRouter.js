const express = require('express');

//schema
const User = require('./User.js');

const router = express.Router();

router.route('/').get((req, res) => {
  User.find({})
    .then(notes => {
      if (notes.length === 0) {
        res.status(404).json({ error: 'No users found!' });
      } else {
        res.status(200).json(notes);
      }
    })
    .catch(error => res.status(500).json(`Error from server: ${error}`));
});

module.exports = router;
