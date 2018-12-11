const express = require('express');
const db = require('../data/dbConfig');
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

route.get('/:id', (req, res) => {
    const { id } = req.params;
    db('notes')
      .where({ id: id })
      .first()
      .then(note => {
          if(note){
              res.status(200).json(note)
          } else {
              res.status(401).json({message: 'Error note does not exist'})
          }
      })
      .catch(err => {
          res.status(404).json({message: 'Can not access note'})
      })
})

route.delete('/:id', (req, res) => {
    const { id } = req.params;
    db('notes')
      .where({ id: id })
      .del()
      .then(count => {
          if(count){
              res.status(200).json({message: 'Delete success'})
          } else {
              res.status(401).json({message: 'Error note does not exist'})
          }
      })
      .catch(err => {
          res.status(404).json({message: 'Can not access note'})
      })
})

route.post('/add', (req, res)=> {
    const notes = req.body;
    db('notes')
      .insert(notes)
      .then(note => {
          console.log(note)
        res.status(201).json(note);
      }).catch(err => res.status(404).json({message: 'Error can not add new note'}))
})

route.put('/:id', (req, res) => {
    const { id } = req.params;
    db('notes')
      .where({ id: id })
      .update(req.body)
      .then(note => {
          res.status(201).json(note)
      }).catch(err => res.status(404).json({message: 'Unable to update note'}))
})


module.exports = route;