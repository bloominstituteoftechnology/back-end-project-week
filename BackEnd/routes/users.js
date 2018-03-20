const express = require('express');
const userRouter = express.Router();

const usersController = require('../controllers/users');

userRouter.route('/')
.get(usersController.getUsers)
.post();

module.exports = userRouter;