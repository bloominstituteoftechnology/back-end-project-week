const express = require('express');

const route = express.Router();

route.get('/', (req, res) => {
    db('notes')
      .then(note => {
          res.status(200).json(note)
      })
      .catch(err => {
          res.status(401).json({message: 'Error unable to retrieve notes'})
      })
})


module.exports = route;