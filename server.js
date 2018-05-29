const express = require("express");
const cors = require("cors");
const port = process.env.PORT || 3333;
const mongoose = "mongoose";
const db = require("./data/db.js");

const server = express();

server.use(express.json());
server.use(cors());

db
  .connect()
  .then(() => console.log("\n... API Connected to Database ...\n"))
  .catch(err => console.log("\n*** ERROR Connecting to Database ***\n", err));

server.get("/", (req, res) => {
  res.json({ message: "all good homie" });
});

server.listen(port, err => {
  if (err) console.log(err);
  console.log(`server running on port ${port}`);
});
