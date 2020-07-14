require("dotenv").config();
const express = require("express");
const cors = require("cors");

// Routes
const NoteRoutes = require("./Routes/NoteRoutes.js");
const TagRoutes = require("./Routes/TagRoutes.js");
const AuthRoutes = require("./Routes/AuthRoutes.js");

// Middleware
const server = express();
server.use(express.json());
server.use(cors());

// Routing
server.use("/api/notes", NoteRoutes);
server.use("/api/tags", TagRoutes);
server.use("/api/users", AuthRoutes);

const port = process.env.PORT || 8000;
server.listen(port, () => {
  console.log(`\n=== Web API Listening on http://localhost:${port} === \n`);
});
