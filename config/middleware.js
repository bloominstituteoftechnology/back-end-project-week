const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');

module.exports = server => {
    server.use(express.json());
    server.use(helmet());
    server.use(morgan('dev'));
};