const express = require('express');
const db      = require('../data/dbConfig.js');
const { authenticate } = require('../auth/authenticate.js');

const parser = express.json();
const router = express.Router();

router.use(parser,authenticate)

router.get('/', (req, res) =>{
  db('notes')
  .then(notes =>{
    res.json(notes)
  })
  .catch(err =>{
    res
    .status(500)
    .json({message:'unable to retrieve information'})
  })
})

router.post('/',(req, res) =>{
  const note= req.body
  db('notes').insert(note)
  .then(id =>{
    res
    .status(201).json({msg:`id ${id} created`})
  })
  .catch(err =>{
    res
    .status(500)
    .json({message:'unable to save information to database'})
  })
})

router.get('/:id',(req, res) =>{
  const { id } = req.params
  db('notes').where('id', id)
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
  db('notes')
  .where('id',id)
  .del()
  .then(rowCount =>{
    res
    .status(201)
    .json(rowCount)
  })
  .catch(err =>{
    res
    .status(500)
    .json({message:'unable to delete specified id '})
  })
})

router.put('/:id',(req, res) => {
  const { id } = req.params
  const note = req.body
  db('notes')
  .where('id', id)
  .update(note)
  .then(rowCount=>{
    res.json(rowCount)
  })
  .catch(err =>{
    res
    .status(500)
    .json({message:'unable to modify specified id'})
  })
})

module.exports = router;