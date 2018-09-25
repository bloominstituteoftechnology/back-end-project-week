const router = require('express').Router();
const helpers = require('../db/helpers');

router.route('/').get(async (req, res, next) => {
  let notes = await helpers.getAllNotes();
  res.status(200).json(notes);
});

module.exports = router;
