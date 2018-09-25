const router = require('express').Router();

const helpers = require('../db/helpers');

router.get('/', async (req, res, next) => {
  let notes = await helpers.getAllNotes();
  notes = notes.reduce((acc, next) => {
    if (acc[next.id]) {
      acc[next.id].tags = [].concat(acc[next.id].tags).concat(next.tags);
    } else {
      acc[next.id] = next;
      acc[next.id].tags = next.tags ? [next.tags] : [];
    }
    return acc;
  }, {});
  res.status(200).json(Object.values(notes));
});

router.post('/', async (req, res, next) => {
  const { title, textBody, tags } = req.body;

  if (!title || !textBody)
    return res.json({ error: 'title or textBody is missing' });

  let id = null;
  if (Array.isArray(tags)) {
    id = await helpers.addNoteWithTags({ title, textBody }, tags);
  } else {
    id = await helpers.addNote({ title, textBody });
  }
  res.status(201).json({ message: 'Note added successfully', id });
});

module.exports = router;
