const express = require('express');
const helmet = require('helmet');
const logger = require('morgan');
//Router
const notes_router = require('../data/routes/notes_routes');
//Server
const server = express();
//In-built middleware
server.use(express.json());
server.use(helmet());
server.use(logger('dev'));
server.use('/', notes_router);
//Simple get request
server.get('/', (req,res) => {
    res.status(200).json({Msg: `Server is up and running`});
});




module.exports = server;
