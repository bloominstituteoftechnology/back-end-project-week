const router = require('express').Router();
const _ = require('lodash');
const helpers = require('../db/helpers');

function tagsReducer(acc, next) {
  if (acc[next.id]) {
    acc[next.id].tags = [].concat(acc[next.id].tags).concat(next.tags);
  } else {
    acc[next.id] = next;
    acc[next.id].tags = next.tags ? [next.tags] : [];
  }
  return acc;
}

router.get('/', async (req, res, next) => {
  let notes = await helpers.getAllNotes();
  notes = notes.reduce(tagsReducer, {});
  res.status(200).json(Object.values(notes));
});

router.post('/', async (req, res, next) => {
  const { title, textBody, tags } = req.body;

  if (!title || !textBody)
    return res.json({ error: 'title or textBody is missing' });

  let id = null;
  if (_.isArray(tags)) {
    id = await helpers.addNoteWithTags({ title, textBody }, tags);
  } else {
    id = await helpers.addNote({ title, textBody });
  }
  res.status(201).json({ message: 'Note added successfully', id });
});

router.get('/:id', async (req, res, next) => {
  let note = await helpers.getOneNote(Number(req.params.id));
  note = Object.values(note.reduce(tagsReducer, {}))[0];
  if (!note)
    return res.json({
      error: 'The note with the specified ID cannot be found',
    });
  res.status(200).json(note);
});

router.delete('/:id', async (req, res, next) => {
  let count = await helpers.deleteNote(Number(req.params.id));
  if (count === 0)
    return res.json({
      error: 'The note with the specified ID cannot be found',
    });

  res.status(200).json({
    message: `Note with id ${req.params.id} has been deleted successfully`,
  });
});

router.put('/:id', async (req, res) => {
  let { title, textBody, tags } = req.body;

  if (!title && !textBody && !Array.isArray(tags))
    return res.json({ error: 'At least one field must be given for update' });

  if (_.isArray(tags)) {
    try {
      let ids = await helpers.updateTags(tags, Number(req.params.id));
    } catch (err) {
      console.log(err);
      return res.json({ error: 'ID not found ' });
    }
  }

  let updateObj = { title, textBody };
  updateObj = _.omitBy(updateObj, _.isUndefined);
  let count = await helpers.updateNote(updateObj, Number(req.params.id));
  if (count === 0) return res.json({ error: 'ID not found' });

  res
    .status(200)
    .json({ message: `Note with id ${req.params.id} updated successfully` });
});

module.exports = router;
