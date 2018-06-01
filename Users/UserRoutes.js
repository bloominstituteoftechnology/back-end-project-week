import express from 'express';
import Passport from 'passport';
import UserController from './UserController';
import Authorize from '../Middleware/authorize';

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

export default UserRouter;