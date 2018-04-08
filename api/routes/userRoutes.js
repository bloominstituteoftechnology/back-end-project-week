const express = require('express');
const userController = require('../controllers/userController');
let appRouter = express.Router();
const jwt = require('../service/auth');

// EndPoint: /api/user/

appRouter.route('/').get(userController.getUsers);

appRouter.route('/').post(userController.createUser);

appRouter.route('/sign_in').post(userController.signInUser);

appRouter.route('/validate_token').get(jwt.validateToken, jwt.resolve);

appRouter.route('/extend_token_life').get(jwt.extendTokenLife);

appRouter.route('/log_out').get(userController.logOut);


module.exports = appRouter;