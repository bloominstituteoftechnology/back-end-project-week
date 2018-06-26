const express = require('express'); // remember to install your npm packages
const helmet = require('helmet');
const cors = require('cors');

/**
 * IMPORT ROUTERS: import any needed Router.
 */
// const Router = require('./model/model.router');

/**
 * DEFINE: Server.
 */
const server = express();

/**
 * DEFINE: global Pre-Middlewares is any.
 */
const corsOptions = {
  origin: 'http://localhost:3000',
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

/**
 * DEFINE: global Post-Middlewares if any
 */

module.exports = server;
