// dependencies
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const handlers = require('./routes-folder/routeBase/handlers.js');
const registration = require('./routes-folder/routeRegistration/handlers.js');
const login = require('./routes-folder/routeLogin/handlers.js');
// server
const server = express();
// middleware
server.use(express.json());
server.use(helmet());
server.use(cors());
// endpoint
server.use('/api/notes', handlers);
server.use('/api/register', registration);
server.use('/api/login', login);
// port
const port = 4000;
server.listen(port, () => console.log(`==== listening port ${port} ====`));
