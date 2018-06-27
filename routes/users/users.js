const router = require('express').Router();

const userFind = require('../../controllers/user_controllers/user_find');

router.get('/:id', userFind);

module.exports = router;