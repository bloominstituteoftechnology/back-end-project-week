const express = require('express');
const cors = require('cors');

module.exports = function(server) {
    server.use(express.json());
    server.use(cors());
}