const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');

module.exports = function(server) {
    server.use(helmet());
    server.use(morgan('dev'));
    //What does morgan do?
    server.use(express.json());
    server.use(cors());
};
