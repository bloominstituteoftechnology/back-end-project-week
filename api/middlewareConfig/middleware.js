const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const knex = require('knex');

module.exports = server => {
const knexConfig = require('../../knexfile');
server.use(express.json());
server.use(morgan('dev'));
server.use(cors());
server.use(helmet());
}