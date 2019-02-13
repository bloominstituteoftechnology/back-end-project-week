const express = require("express");
const cors = require("cors");
const notes = require("../notes/notes.js");
const server = express();

server.use(express.json(), cors());

//request to see if server running
server.get("/", async (req, res) => {
   res.status(200).json({api: "running"});
});

//request to see all notes
server.get("/notes/all", async (req, res) => {
   const rows = await notes.getAll();

   res.status(200).json(rows);
});


module.exports = server;