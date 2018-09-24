const router = require('express').Router();
const notes = require('./helpers/notes');

router.route('/')
  .get(notes.GET_ALL)
  .post(notes.POST);

router.route('/:id')
  .get(notes.GET_ONE)
  .delete(notes.DELETE)
  .put(notes.PUT);

module.exports = router;
