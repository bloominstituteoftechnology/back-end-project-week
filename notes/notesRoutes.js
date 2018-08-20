const express = require('express');
const notesModel = require('../data/helpers/notesModel.js');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const notes = await notesModel.getAll();
    res.status(200).json(notes);
  } catch (e) {
    res.status(500).send({ error: 'Sorry, your notes could not be retrieved.' });
  }
});

router.post('/', async (req, res) => {

});

router.put('/:id', async (req, res) => {
  
});

router.delete('/:id', async (req, res) => {

});

module.exports = router;