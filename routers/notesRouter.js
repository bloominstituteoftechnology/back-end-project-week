//Import Helper Functions
const notesDb = require('../data/helpers/notesDb.js');

//Create Router
const express = require('express');
const router = express.Router();

//Create Route Handlers
router.get('/', (req, res) =>{
  res.json({msg: "router working!!"})
})


//Export Router
module.exports = router;
