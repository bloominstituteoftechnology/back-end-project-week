const express = require('express');
const db      = require('../helpers/dbHelpers.js');
const { authenticate } = require('../auth/authenticate.js');

const parser = express.json();
const router = express.Router();

router.use(parser,authenticate)

router.get('/', (req, res) =>{
  db.getNotes()
  .then(notes =>{
    res.json(notes)
  })
  .catch(err =>{
    res
    .status(500)
    .json({error:'unable to retrieve information'})
  })
})

router.post('/',(req, res) =>{
  const note= req.body
  db.createNote(note)
  .then(id =>{
    id ? db.getNotesById(id).then(note =>{
    res.json(note)
    }) 
    :res.status(201).json({msg:"unable to create note"})
  })
  .catch(err =>{
    res
    .status(500)
    .json({error:'unable to save information to database'})
  })
})

router.get('/:id',(req, res) =>{
  const { id } = req.params
  db.getNotesById(id)
  .then(note =>{
    res.json(note)
  })
  .catch(err =>{
    res
    .status(500)
    .json({message:'unable to retrieve specified id '})
  })
})

router.delete('/:id',(req, res) =>{
  const { id } = req.params
  db.removeNote(id)
  .then(rowCount =>{
    res
    .status(201)
    .json(rowCount)
  })
  .catch(err =>{
    res
    .status(500)
    .json({error:'unable to delete specified id '})
  })
})

router.put('/:id',(req, res) => {
  const { id } = req.params;
  const updatedNote = req.body;
  db.updateNote(id, updatedNote)
  .then(rowCount =>{
    rowCount?
      db.getNotesById(id)
      .then(note =>{
        res.json(note)
      })
      :res.status(404).json({message:"unable to update note"})
  })
  .catch(err =>{
    res.status(500).json({error:"Server encountered some issues"})
  })
})

router.get('/search', (req, res) =>{
  const { query } = req.query;
  // if( !req.query.query){
  //   res.status(404).json({message:"missing search term"})
  // }
  // else{
  db('notes')
  .then(notes =>{
    // const notesArr =[];
    // notes.push(notesArr);
    // const arr = notes.filter(note =>{
    //   return note.title.toLowerCase().includes(search);
    // })
    res.status(200).json(notes)
  })
  .catch(err =>{
    res.status(500).json({message: "no results found"})
  })
  //}
})

module.exports = router;