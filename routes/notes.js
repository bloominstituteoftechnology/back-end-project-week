const router = require('express').Router();

const helpers = require('../db/helpers');

router.route('/').get(async (req, res, next) => {
  let notes = await helpers.getAllNotes();
  notes = notes.reduce((acc, next) => {
    if (acc[next.id]) {
      acc[next.id].tags = [].concat(acc[next.id].tags).concat(next.tags);
    } else {
      acc[next.id] = next;
      acc[next.id].tags = [next.tags];
    }
    return acc;
  }, {});
  res.status(200).json(Object.values(notes));
});

module.exports = router;
