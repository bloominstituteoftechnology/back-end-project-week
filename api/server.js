const express = require("express");
const cors = require("cors");
const server = express();

const noteRouter = require("../Routers/note_router.js");
const userRouter = require("../Routers/user_router.js");

server.use(express.json(), cors());
server.use("/api/notes", noteRouter);
server.use("/api/users", userRouter);

//request to see if server running
server.get("/", async (req, res) => {
   res.status(200).json({api: "running"});
});

module.exports = server;