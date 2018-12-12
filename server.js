const express = require('express');
const cors = require('cors');

const configureRoutes = require('./api/routes');

const server = express();

server.use(express.json());
server.use(cors());

configureRoutes(server);

const port = process.env.PORT || 9000;
server.get("/", (req, res) => {
    res.send(`Api running on port: ${port}`);
   });

module.exports = {
    server,
};