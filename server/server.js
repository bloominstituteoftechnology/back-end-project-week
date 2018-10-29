// dependencies
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const handlers = require('./route/handlers.js');
// server
const server = express();
// middleware
server.use(express.json());
server.use(helmet());
server.use(cors());
// endpoint
server.use('/api/notes', handlers);
// port
const port = 4000;
server.listen(port, () => console.log(`==== listening port ${port} ====`));
