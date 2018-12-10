const express = require("express");

const server = express();

server.use(express.json());

const db = require("../data/dbConfig.js");

// Sanity Endpoint
server.get("/", (req, res) => {
    res.status(200).json({ api: "Up and running" });
});

module.exports = server;