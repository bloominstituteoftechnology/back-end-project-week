const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const mongoose = require("mongoose");

const noteRouter = require("./notes/noteRouter.js");

const server = express();

server.use(helmet());
server.use(cors({ origin: "http://localhost:3000" }));
server.use(express.json());

server.get("/", function(req, res) {
  res.json({ api: "running" });
});

server.use("/api/notes", noteRouter);

mongoose.Promise = global.Promise;
mongoose.connect(
  "mongodb://localhost/budgetTracker",
  {},
  error => {
    if (error) console.log("Database connection failed");
    else console.log("Successfully Connected to MongoDB");
  }
);

const port = process.env.PORT || 5000;
server.listen(port, () => {
  console.log(`\n=== API running on http://localhost:${port} ===\n`);
});
