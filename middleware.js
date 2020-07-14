const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');

module.exports = server =>{
    server.use(express());
    server.use(helmet());
    server.use(morgan());
    server.use(cors());
}
