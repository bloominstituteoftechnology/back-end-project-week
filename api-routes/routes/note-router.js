const express = require('express')

const db = require('../../data/db.js');

const router = express.Router();

router.get('/', (req, res) => {
  db('notes')
  .then(response => {
    res.status(200).json(response);
  })
  .catch(error => {
    res.status(404).send('error fetching notes...')
    console.log(error.message)
  })
})

router.get('/:id', (req, res) => {
  db('notes')
  .where('id', req.params.id).first()
  .then(response => {
  res.status(200).json(response);
  })
  .catch(error => {
    res.status(404).send('error fetching individual note...')
    console.log(error.message)
  })
})


router.post('/', (req, res) => {
  let { title, topic, text } = req.body;
  let note = {

    title,
    topic,
    text
  }
  db('notes')
  .insert(note)
  .then(ids => ({ id: ids[0] }),
  res.status(200).json(note))
    .catch(error => {
      res.status(500).send('error adding note...')
      console.log(error.message)
    })
  })

router.delete('/:id', (req, res) => {
  const id = Number(req.params.id);
  db('notes')
  .where('id', id)
  .del()
  .then(response => {
    res.status(200).json('The note was deleted successfully');
  })
  .catch(error => {
    console.log(error.message)
    res.status(404).send("the note could not be removed")
  })
})

router.put('/:id', (req, res) => {
  let id = req.params.id;
  let { userId, title, topic, text } = req.body;
  let changes = {
    userId,
    title,
    topic,
    text
  }
  db('notes')
  .where('id', id)
  .update(changes)
  .then(response => {
    res.status(200).json(response)
  })
  .catch(error => {
    console.log(error.message)
    res.status(500).send('Unable to update the note...')
  })
})

module.exports = router;
