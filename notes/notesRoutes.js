const express = require('express');
const notesModel = require('../data/helpers/notesModel.js');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const notes = await notesModel.readAll();
    res.status(200).json(notes);
  } catch (e) {
    res.status(500).send({ error: 'Sorry, your notes could not be retrieved.' });
  }
});

router.get('/:id', async (req, res) => {

});

router.post('/', async (req, res) => {
  const { title } = req.body;
  if (!title) {
    res.status(400).send({ error: 'Please provide a title for the post.' })
  } else {
    try {
      const added = await notesModel.create(req.body);
      res.status(201).json({ id: added.id});
    } catch (e) {
      res.status(500).send({ error: 'There was an error while saving your note to the database.' });
    }
  }
});

router.put('/:id', async (req, res) => {
  
});

router.delete('/:id', async (req, res) => {

});

module.exports = router;