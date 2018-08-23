require('dotenv').config();
const cors = require('cors');
const express = require('express');
const helmet = require('helmet');

// routers
const noteRouter = require('./notes/index');

const server = express();
server.use(cors());
server.use(express.json());
server.use(helmet());

server.use('/notes', noteRouter);

server.get('/', (req, res) => {
    res.status(200).send(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});

server.use(function (req, res) {
    res.status(404).json({ error: "Page Not Found" });
});

const port = process.env.PORT || 8000
server.listen(port, function () {
    console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});

module.exports = server;
