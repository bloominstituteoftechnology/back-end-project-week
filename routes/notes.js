// ***** Notes ***** //
const router = require('express').Router();
const helpers = require('../db/helpers');

// *****  ***** //
function tagReduce(acc, next) {
  if (acc[next.id]) {
    acc[next.id].tags = [].concat(acc[next.id].tags).concat(next.tags);
  } else {
    acc[next.id] = next;
    acc[next.id].tags = next.tags ? [next.tags] : [];
  }
  return acc;
}

// #################### GET #################### //

// ******* GET ******* //
 router.route('/').get(async (req, res, next) => {
  //  accumulator can be an intimidating term, so you can think of it like the current state of the array as we're applying the logic on the callback's invocations/ Google Fu
  let notes = await helpers.getAllNotes();
  notes = notes.reduce(tagReduce, {});
  res.status(200).json(Object.values(notes));
});

// ******* GET Single Note ******* //
router.get('/:id', async (req, res, next) => {
  let note = await helpers.getOneNote(Number(req.params.id));
  note = Object.values(note.reduce(tagReduce, {}))[0];
  if (!note)
    return res.json({
      Error: `I'm not calling you a liar but....that ID doesn't exist`,
    });
  res.status(200).json(note);
});

// #################### POST #################### //
router.post('/', async (req, res, next) => {
  const { title, textBody, tags } = req.body;
   if (!title || !textBody)
    return res.json({ Error: 'Stop forgetting things' });
   let id = null;
  if (Array.isArray(tags)) {
    id = await helpers.addNoteWithTags({ title, textBody }, tags);
  } else {
    id = await helpers.addNote({ title, textBody });
  }
  res.status(201).json({ Message: 'I think it worked', id });
});

// #################### DELETE #################### //

router.delete('/:id', async (req, res, next) => {
  let count = await helpers.deleteNote(Number(req.params.id));
  if (count === 0)
    return res.json({
      Error: `I'm not calling you a liar but....that ID doesn't exist`,
    });
   res.status(200).json({
    Message: `The note that had the id of ${req.params.id} has been destroyed...peacefully`,
  });
});

 module.exports = router;