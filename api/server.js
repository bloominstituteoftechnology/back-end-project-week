const express = require('express');
const helmet = require('helmet');
const logger = require('morgan');

//Server
const server = express();
//In-built middleware
server.use(express.json());
server.use(helmet());
server.use(logger('dev'));
//Simple get request
server.get('/', (req,res) => {
    res.status(200).json({Msg: `Server is up and running`});
});


module.exports = server;
