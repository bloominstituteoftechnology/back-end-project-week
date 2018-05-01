const express = require("express");
// ---> cors

const server = express();

server.use(express.json());

// server.get("/", (req, res) => {
//     res.json({ msg: "Connected" });
// });

module.exports = server;
