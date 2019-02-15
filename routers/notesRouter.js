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

//GET by Id
router.get('/:id', (req, res)=>{
  const id = req.params.id;

  notesDb.getNotesById(id)
  .then(note =>{
    if(note){
      res.status(200).json(note);
    }else{
      res.status(404).json({error: 'The specified note does not exist'})
    }
  })
  .catch(err =>{
    res.status(500).json({error: 'Unable to retrieve note'})
  })
})

//POST Route Handler
router.post('/', (req, res) =>{
  const note = req.body;
  notesDb.addNote(note)
  .then(id =>{
    res.status(201).json(id);    
  })
  .catch(err =>{
    res.status(500).json({error: 'Unable to add note'});
  })
})




//Export Router
module.exports = router;
