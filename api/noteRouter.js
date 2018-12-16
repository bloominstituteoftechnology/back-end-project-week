const express = require('express');
const db = require('../data/helpers/notesHelpers');
const router = express.Router();


//gets all notes
router.get('/',  async (req, res) => {
  try {
      const notes = await db.getAll();
      res.status(200).json(notes)
  } 
  catch (err) {
      res.status(500).json(err);
  }
});

//gets notes by id
router.get('/get/:id', async (req, res) => {
  const {id} = req.params;
  try {
      const note = await db.getById(id);
      if (!note) {
          res.status(404).json({message: "note does not exist"})
      } 
      else {
          res.status(200).json(note)
      }
  } 
  catch (err) {
      res.status(500).json(err);
  }
});


//adds a new note
router.post('/create', async (req, res) => {
  const {title, content} = req.body;
  try {
      if (!title || !content) {
          res.status(422).json({message: "title and/or textBody is missing"});
      } 
      else {
          let response = await db.insert(req.body)
          res.status(201).json(response)
      }
  } 
  catch (err) {
      res.status(500).json(err)
  }
})


//edits a note
router.put('/edit/:id', (req,res) => {
  const {title, content} = req.body;
  const {id} = req.params;
  if (!title || !content) {
      res.status(422).json({message: "title and/or textBody is missing"});
  } 
  
      db.getById(id)
      .then(note => {
          if (note) {
              db.update(id, req.body)
              .then(note => res.status(201).json(note))
          }
      })
      .catch(err => res.status(404).json({message:"note does not exist"}));

})


//deletes a note
router.delete('/delete/:id', async (req, res) => {
  const {id} = req.params;
  try {
      const note = await db.getById(id);
      if (!note) {
          res.status(404).json({message: "note does not exist"})
      } else {
          const removal = await db.remove(id);
          res.status(200).json(removal)
      }
  } 
  catch (err) {
      res.status(500).json(err);
  }
})

module.exports = router;
