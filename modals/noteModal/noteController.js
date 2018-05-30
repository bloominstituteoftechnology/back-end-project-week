const express = require('express');
const router = express.Router();
const Note = require('./noteSchema.js');

//grabs list of notes
router.get('/', (req, res) => {
  Note.find()
  .then(notes => {
    res.status(200).json(notes);
  })
  .catch(err => {
    res.status(500).json({error: 'Could not retrieve data from server.'})
  });
})

//grab note id

.get('/:id', (req, res) => {
  const { id } = req.params;
  Note.findById(id)
    .then(note => {
      if(!note) {
        res.status(404).json({message: "Note could not be found. Please try a different ID."});
      } else {
        res.status(200).json(note);
      }
    })
    .catch(err => {
      res.status(500).json({error: 'Could not retrieve data from server.'})
    })
})

//post route

.post('/', (req, res) => {
  const note = new Note(req.body);
  note.save()
    .then(note => {
      res.status(200).json(note);
    })
    .catch(error => {
      res.status(500).json({message: "Note could not be saved. Please try again later!"})
    })
})