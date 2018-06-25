const router = require('express').Router();

const taskFind = require('../../controllers/task_controllers/task_find');
const taskCreate = require('../../controllers/task_controllers/task_create');

router
  .get('/', taskFind)
  .post('/', taskCreate);

module.exports = router;