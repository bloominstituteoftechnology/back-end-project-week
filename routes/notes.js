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
      ac[next.id].tags = [next.tags];
    }
    return ac;
  }, {});
  res.status(200).json(Object.values(notes));
});


 module.exports = router;