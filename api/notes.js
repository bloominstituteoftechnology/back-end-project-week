const router = require('express').Router();
const h = require('./helpers/notes');

router.route('/')
  .get(h.GET_ALL)
  .post(h.POST);

router.route('/:id')
  .get(h.GET_ONE)
  .delete(h.DELETE)
  .put(h.PUT);

module.exports = router;
