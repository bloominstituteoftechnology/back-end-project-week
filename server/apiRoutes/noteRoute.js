const express = require('express');
const db  = require('../data/db');
const router = express.Router();

router.get('/', (req, res) => {
  db('notes')
    .then(note => {res.status(200).json(note)})
    .catch(err => res.status(500).json(err))
});

router.get('/:id', (req, res) => {
  const id = req.params.id
  db('notes')
    .where({id})
    .then( note => {
      if (note.length > 0){res.status(200).json(note)
      } else {res.status(400).json({err: 'Unable to find note ID.'})}  
      })
      .catch(err => res.status(500).json(err))
})

router.put('/:id', (req, res) => {
  const id = req.params.id
  const body= req.body
  db('notes')
    .where({id})
    .update(body)
    .then(note => {
      if (note === 1){res.status(200).json({ message: 'note updated!'})}
        else {res.status(400).json({err: 'note not found!'})}})
      .catch(err => res.status(500).json(err))
})

router.post('/', (req, res) => {
  const note = req.body
  db
    .insert(note)
    .into('notes')
    .then( data => {
      if (data.length === 1){res.status(201).json({message: 'note added'})}
    })
    .catch(err => res.status(500).json(err))
})

router.delete('/:id', (req,res) => {
  const id = req.params.id
  db('notes')
    .where({id})
    .delete()
    .then( data => {
      if (data === 1){res.status(201).json({message: `1 note deleted`})
      } else {res.status(400).json({message: 'note with that ID not found'})}
    })
    .catch(err => res.status(500).json(err))
})

module.exports = router;