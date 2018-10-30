// ***** Notes ***** //
const router = require('express').Router();
const helpers = require('../db/helpers');

// ******* GET ******* //
 router.route('/').get(async (req, res, next) => {
  //  accumulator can be an intimidating term, so you can think of it like the current state of the array as we're applying the logic on the callback's invocations/ Google Fu
  let notes = await helpers.getAllNotes();
  notes = notes.reduce((ac, next) => {
    if (ac[next.id]) {
      ac[next.id].tags = [].concat(ac[next.id].tags).concat(next.tags);
    } else {
      ac[next.id] = next;
      ac[next.id].tags = next.tags ? [next.tags] : [];
    }
    return ac;
  }, {});
  res.status(200).json(Object.values(notes));
});

router.post('/', async (req, res, next) => {
  const { title, textBody, tags } = req.body;
   if (!title || !textBody)
    return res.json({ error: 'Stop forgetting things' });
   let id = null;
  if (Array.isArray(tags)) {
    id = await helpers.addNoteWithTags({ title, textBody }, tags);
  } else {
    id = await helpers.addNote({ title, textBody });
  }
  res.status(201).json({ message: 'I think it worked', id });
});


 module.exports = router;