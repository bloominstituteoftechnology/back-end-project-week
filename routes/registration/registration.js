const router = require('express').Router();

const registrationCreate = require('../../controllers/registration_controllers/registration_create');

router.post('/', registrationCreate);

module.exports = router;