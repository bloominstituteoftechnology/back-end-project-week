const express = require('express');
const router = express.Router();
const protected = require('../../../middlewares/protected');

const db = require('../../../data/helpers/Note');

router.get('/', protected, async (req, res) => {
  try {
    const notes = await db.getAll();
    return res.status(200).json(notes);
  } catch (error) {
    return res
      .status(500)
      .json({ error: 'There was an error getting the users.' });
  }
});

router.get('/:id', protected, async (req, res) => {
  const { id } = req.params;
  try {
    const note = await db.get(id);
    if (!note) {
      return res.status(404).json({ message: 'That note does not exist.' });
    }
    return res.status(200).json(note);
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'There was an error accessing that note.' });
  }
});

router.post('/', async (req, res) => {
  const postData = req.body;
  if (!postData.title || !postData.content || !postData.user_id) {
    return res
      .status(400)
      .json({ message: 'Note requires a title, content, and user_id' });
  }
  try {
    const post = await db.insert(postData);
    return res.status(201).json(post);
  } catch (error) {
    return res
      .status(500)
      .json({ error: 'There was a problem adding a new note.' });
  }
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const changes = req.body;
  try {
    const updatedNote = await db.update(changes, id);
    if (!updatedNote) {
      res.status(404).json({ message: 'That note does not exist.' });
    }
    res.status(200).json(updatedNote);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: 'Something went wrong updating that note.' });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const count = await db.remove(id);
    if (count) {
      res.status(200).json({ message: 'Note was successfully removed.' });
    } else {
      res.status(404).json({ message: "That note doesn't exist." });
    }
  } catch (error) {
    res.status(500).json({ error: 'There was a problem deleting that note.' });
  }
});

module.exports = router;
