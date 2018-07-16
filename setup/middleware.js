const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');

module.exports = function(server) {
    server.use(helmet());
    server.use(morgan('dev'));
    server.use(express.json());
    server.use(cors());
}