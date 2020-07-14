const express = require('express');

const apiRouter = require('./api-routes/apiRouter.js')

const server = express();

server.use(express.json());

server.use('/api', apiRouter)

server.listen(8000, () => console.log('API Running...'));
