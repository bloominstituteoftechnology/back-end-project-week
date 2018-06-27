const router = require('express').Router();

const taskFindAll = require('../../controllers/task_controllers/task_find_all');
const taskCreate = require('../../controllers/task_controllers/task_create');
const taskFind = require('../../controllers/task_controllers/task_find');
const taskUpdate = require('../../controllers/task_controllers/task_update');
const taskDelete = require('../../controllers/task_controllers/task_delete');

router.post('/', taskFindAll)

router.post('/new', taskCreate);

router
  .get('/:id', taskFind)
  .put('/:id', taskUpdate)
  .delete('/:id', taskDelete);

module.exports = router;