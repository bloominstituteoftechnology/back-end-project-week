const express = require("express");

const server = express();

const configMiddleware = require("./middleware/middleware.js");
configMiddleware(server);

// server sanity check
server.get("/", (req, res) => {
  res.send("Server is humming along nicely.");
});

// port setup
server.listen(3300, () => console.log("\nrunning on port 3300\n"));
