const express = require("express");
// const middleware = require("./middleware/config");
// const noteRouter = require("./routes/noteRoutes.js");

const server = express();

//middleware
// middleware(server);

//routes
// server.use("/api/users", noteRouter);

server.get("/", (req, res) => {
    res.status(200).json({ 'message: server up' });
  });

module.exports = server;
