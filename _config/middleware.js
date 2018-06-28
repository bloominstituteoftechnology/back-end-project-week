const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const corsOptions = {
    origin: "*",
    credentials: true
};

module.exports = function (server) {
    server.use(helmet());
    server.use(express.json());
    server.use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*'); // Cross Site Allowance
        res.setHeader(
            'Access-Control-Allow-Headers',
            'Origin, X-Requested-With, Content-Type, Accept'
        );
        next();
    });
    server.use(cors(corsOptions));
};
