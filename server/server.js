const express = require('express'); // remember to install your npm packages
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');

/**
 * IMPORT ROUTERS: import any needed Router.
 */
const notesRouter = require('./routers/Notes.router');
const registerUser = require('../auth/register.router');
const userRouter = require('./routers/User.router');

/**
 * DEFINE: Server.
 */
const server = express();

/**
 * DEFINE: global Pre-Middlewares is any.
 */
const corsOptions = {
  origin: 'http://localhost:3000', // dafult create-react-app URL
  methods: [], // authorized HTTP verbs -> if ommit allow all HTTP verbs
  credentials: true,
};
server.use(helmet());
server.use(cors());
server.use(express.json());

/**
 * DEFINE: Endpoints.
 */
server.get('/', (req, res) => res.send('API Running...'));

server.use('/api/register/', registerUser);
server.use('/api/users', userRouter);

server.use('/api/notes', notesRouter);

/**
 * DEFINE: global Post-Middlewares if any
 */

module.exports = server;
