const express = require('express');
const userController = require('../controllers/userController');
let appRouter = express.Router();

// EndPoint: /api/user/

appRouter.route('/').get(userController.getUsers);

appRouter.route('/').post(userController.createUser);

module.exports = appRouter;