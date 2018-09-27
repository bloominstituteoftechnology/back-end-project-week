const express = require('express');
const router = express.Router();
const notesModels = require('./notesModels.js');

router.get('/',(req,res)=>{
  notesModels.get()
    .then(data => {
      res.status(200).json(data)
    })
    .catch(err => {
      console.log(`Error: ${err}`);
      res.status(500).json({message: `Unable to complete request`})
    });
});

router.post('/', (req,res)=>{
  let { title } = req.body.title;
    notesModels.insert(req.body)
      .then(data => {
        res.status(201).json(data);
      })
      .catch(err => {
        console.log(`ERROR: ${err}`);
        res.status(501).json({message: 'Trouble creating this note'})
      });
});

router.put('/:id', (req, res)=>{
  let id = req.body.id;
  let changes = req.body;
  console.log(changes);
  notesModels.update(id, changes)
    .then(data => {
      console.log('notenotenote',data);
      res.status(200).json(data);
    })
    .catch(err => {
      console.log(`ERROR: ${err}`);
      res.status(501).json({ message: 'Trouble creating this note' })
    });
});

router.delete('/:id', (req, res) => {
  let id = parseInt(req.params.id);
  console.log(typeof id);
  notesModels.delete(id)
    .then(data => {
      res.status(204).json(data)
    })
    .catch(err => {
      console.log('Error', err);
      
      res.status(504).json({message: `Trouble deleting note.`})
    });
});

module.exports = router;