const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');

module.exports = function(server) {
	server.use(helmet());
	server.use(morgan('dev'));
	server.use(express.json());
	server.use(cors());
};
//I'm pretty sure all this does is save me a few lines in my server.js file. But if I ever need more middleware, this is where I'd put it.
