const express = require('express');
const knex = require('knex');
const knexConfig = require('../knexfile');
const db = knex(knexConfig.development);
const router = express.Router();


//gets all notes
router.get('/', (req, res) => {
  db('notes')
  .then(notes => res.status(200).json(notes))
  .catch(error => res.status(500).json({message: 'an error occured while retrieving data', error}))
})

//gets a note by it's id
router.get('/:id', (req, res) => {
  const { id } = req.params;

  db('notes')
    .where({id: id})
    .then(note => res.status(200).json(note))
    .catch(error => res.status(500).json({message: 'an error occured while retrieving your note'. error}))
})

//adds a new note
router.post('/', (req, res) => {
  const note = req.body;
   db('notes')
    .insert(note)
    .returning('id')
    .then( id => {
      res.status(201).json(id)
    })
    .catch(error => {
      res.status(500).json({message: 'Error adding note', error})
    })
})
module.exports = router;

//updates a note
router.put('/:id', (req, res) => {
  const changes = req.body;
  const { id } = req.params;

  db('notes')
    .where({id: id})
    .update(changes)
    .then(count => {
      res.status(201).json(count)
    })
    .catch(error => {
      res.status(500).json({ message: 'error updated your note', error})
    })
})

//deletes a note
router.delete('/:id', (req, res) => {
  const { id } = req.params;

  db('notes')
    .where({id: id})
    .del()
    .then(count => {
      res.status(201).json(count)
    })
    .catch(error => {
      res.status(500).json({message: 'error deleting note', error})
    })
})
