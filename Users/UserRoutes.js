const express = require('express');
const Passport = require('passport');
const UserController = require('./UserController');
const Authorize = require('../Middleware/authorize');

const UserRouter = express.Router();
const { getUsers, createUser, login, logout } = UserController;
const { localStrategy, jwtStrategy } = Authorize;

Passport.use(localStrategy);
Passport.use(jwtStrategy);

const passportOptions = { session: false };
const authenticate = Passport.authenticate('local', passportOptions);
const checkForToken = Passport.authenticate('jwt', passportOptions);

UserRouter.get('/', checkForToken, getUsers);
UserRouter.post('/register', createUser);
UserRouter.post('/login', authenticate, login);
UserRouter.get('/logout', logout);

module.exports = UserRouter;