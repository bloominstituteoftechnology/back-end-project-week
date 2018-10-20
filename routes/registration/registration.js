const router = require('express').Router();

const registrationCreate = require('../../controllers/registration_controllers/registration_create');
const registrationLogin = require('../../controllers/registration_controllers/registration_login');

router.post('/', registrationCreate);

router.post('/login', registrationLogin);

module.exports = router;