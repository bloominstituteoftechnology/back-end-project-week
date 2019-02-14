//Import Helper Functions
const notesDb = require('../data/helpers/notesDb.js');

//Create Router
const express = require('express');
const router = express.Router();

//Create Route Handlers
//GET Route Handler
router.get('/', (req, res) =>{
  notesDb.getNotes()
  .then(notes =>{
    console.log(notes)
    res.status(200).json(notes)
  })
  .catch(err =>{
    res.status(500).json({error: 'Unable to retrieve notes'})
  })
})




//Export Router
module.exports = router;
