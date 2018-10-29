const express = require('express');
const helpers = require('./helpers.js');
const router = express.Router();

router.get('/', (req, res) => {
  helpers
    .getNotes()
      .then(notes => {
        res.status(200).json(notes);
      })
      .catch(err => {
        res.status(500).json(err);
      });
});

// export

module.exports = router;