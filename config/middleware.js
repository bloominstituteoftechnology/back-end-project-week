const express = require('express');
const logger = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
module.exports = server => {
    server.use(cors());
    server.use(express.json());
    server.use(helmet());
    server.use(logger('dev'));
} 