const express = require('express');

const UserController = require('../controllers/userController');
const router = express.Router();

router.get("/", (request, response) => {
    response.status(200).json({ api: 'Server running OK.' });
});

router.post("/register", (request, response) => {
    UserController.register(request, response);
});

router.post("/login", (request, response) => {
    UserController.login(request, response);
})

module.exports = router;