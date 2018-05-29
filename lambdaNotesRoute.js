const express = require('express');
const router = express.Router();
const Notes = require('./lambdaNotesModel.js')

router.get('/', (req, res) => {
  Notes
    .find({})
    .then(p => {
      res.status(200).json({ notes: p })
    })
    .catch(err => {
      res.status(500).json({ msg: err })
    })
})

router.post('/', (req, res) => {
  const newNote = new Notes(req.body)
  newNote
    .save()
    .then(p => {
      res.status(200).json({ msg: 'note posted successfully', p })
    })
    .catch(err => {
      res.status(200).json({ msg: '... not able to post your note' })
    })
})

router.put('/:id', (req, res) => {
  const id = req.params.id;
  const obj = req.body;
  Notes
    .findByIdAndUpdate(id, obj)
    .then(p => {
      res.status(200).json({ msg: 'note updated successfully', p })
    })
    .catch(err => {
      res.status(500).json({ msg: '... not able to update your note' })
    })
})

router.get('/:id', (req, res) => {
  const id = req.params.id;

  Notes
    .findById(id)
    .then(p => {
      res.status(200).json({ msg: '...note successfully found', p })
    })
    .catch(err => {
      res.status(200).json({ msg: '... not able to find  your note' })
    })
})
router.delete('/:id', (req, res) => {
  const id = req.params.id;

  Notes
    .findById(id).remove()
    .then(p => {
      res.status(200).json({ msg: '...note successfully deleted' })
    })
    .catch(err => {
      res.status(200).json({ msg: '... not able to  delete note' })
    })
})




module.exports = router; 