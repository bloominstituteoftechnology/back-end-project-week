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
      res.status(200).json(note[0]);
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
  console.log(note);
  notesDb.addNote(note)
  .then(id =>{
    console.log(id);
    res.status(201).json(id);    
  })
  .catch(err =>{
    res.status(500).json({error: 'Unable to add note'});
  })
})

//PUT Route Handler
router.put('/:id', (req, res) =>{
  const id = req.params.id;
  const note = req.body;

  notesDb.updateNote(id, note)
  .then(count =>{
    if(count){
      notesDb.getNotesById(id)
      .then(note =>{
        res.status(200).json(note[0])
      })
    }else {
      //note doesn't exist
      res.status(404).json({error: 'The note with the specified id does not exist'})
    }
  })
  .catch(err =>{
    res.status(500).json({error: 'Unable to edit the specified note'})
  })
})

//DELETE Route Handler
router.delete('/:id', (req, res) =>{
  const id = req.params.id;

  notesDb.getNotesById(id)
  .then(note =>{
    if(note){
      notesDb.deleteNote(id)
      .then(count =>{
        res.status(200).json(note[0]);
      })
    }else{
      //note doesn't exist
      res.status(404).json({error: 'The note with the specified id does not exist'});
    }
  })
  .catch(err =>{
    res.status(500).json({error: 'Unable to delete the note'});
  })

})




//Export Router
module.exports = router;
