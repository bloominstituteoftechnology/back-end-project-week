require('dotenv').config();
const express = require("express");

const server = express();

const configMiddleware = require("./middleware/middleware.js");
configMiddleware(server);

// server sanity check
server.get("/", (req, res) => {
  res.send("Server is humming along nicely.");
});

// port setup
const port = process.env.PORT || 3333;
server.listen(port, () => console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`));
