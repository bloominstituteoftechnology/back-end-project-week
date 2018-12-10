const express = require('express');
const router = express.Router();

const db = require('../../../data/helpers/Note');

router.get('/', async (req, res) => {
  try {
    const notes = await db.getAll();
    return res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({ error: 'There was an error getting the users.' });
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const note = await db.get(id);
    if (!note) {
      res.status(404).json({ message: 'That note does not exist.' });
    }
    res.status(200).json(note);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'There was an error accessing that note.' });
  }
});

router.post('/', async (req, res) => {
  const postData = req.body;
  if (!postData.title || !postData.content || !postData.user_id) {
    res
      .status(400)
      .json({ message: 'Note requires a title, content, and user_id' });
  }
  try {
    const post = await db.insert(postData);
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ error: 'There was a problem adding a new note.' });
  }
});

module.exports = router;
