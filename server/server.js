const express = require('express'); // remember to install your npm packages
const helmet = require('helmet');
const logger = require('morgan');
const cors = require('cors');
const utils = require('../auth/utils');

/**
 * PASSPORT: import setup
 */
// const passportSetup = require('../auth/passport');

/**
 * IMPORT ROUTERS: import any needed Router.
 */
const registerUser = require('../auth/register.router');
const loginUser = require('../auth/loign.router');
const authRouter = require('../auth/auth.router');
const userRouter = require('./routers/User.router');
const notesRouter = require('./routers/Notes.router');

/**
 * DEFINE: Server.
 */
const server = express();

/**
 * DEFINE: global Pre-Middlewares if any.
 */
const corsOptions = {
  origin: 'http://localhost:3000', // dafult create-react-app URL
  methods: [], // authorized HTTP verbs -> if ommit allow all HTTP verbs
  credentials: true,
};
server.use(logger('dev'));
server.use(helmet());
server.use(cors({}));
server.use(express.json());

/**
 * DEFINE: Endpoints.
 */
server.get('/', (req, res) => res.send('API Running...'));

server.use('/api/register', registerUser);
server.use('/api/login', loginUser);
server.use('/auth/google', authRouter);
// CONTROL ACCESS TO ONLY REGISTERED USERS
// server.use(utils.userHasToken);
server.use('/api/users', userRouter);
server.use('/api/notes', notesRouter);

/**
 * DEFINE: global Post-Middlewares if any
 */

module.exports = server;
