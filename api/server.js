const express = require('express');
const server = express();

server.get('/', (req, res) => res.send({API: "live"}));
module.exports = server; 