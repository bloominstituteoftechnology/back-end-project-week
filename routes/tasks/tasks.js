const router = require('express').Router();

const taskFindAll = require('../../controllers/task_controllers/task_find_all');
const taskCreate = require('../../controllers/task_controllers/task_create');
const taskFind = require('../../controllers/task_controllers/task_find');

router
  .get('/', taskFindAll)
  .post('/', taskCreate);

router
  .get('/:id', taskFind);

module.exports = router;