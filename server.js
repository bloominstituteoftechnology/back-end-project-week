const express = require("express");

// Routes
const NoteRoutes = require("./Routes/NoteRoutes.js");
const TagRoutes = require("./Routes/TagRoutes.js");

// Middleware
const server = express();
server.use(express.json());

// Routing
server.use("/api/notes", NoteRoutes);
server.use("/api/tags", TagRoutes);

server.use("/", (req, res) => {
  res.send("server is up!!!");
});

server.listen(8000, () => {
  console.log(`\n=== Web API Listening on http://localhost:8000 === \n`);
});
