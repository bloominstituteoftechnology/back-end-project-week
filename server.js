const express = require("express");
const cors = require("cors");

const server = express();

server.use(express.json());
server.use(cors());

server.get("/", (req, res) => {
  res.json({ message: "all good homie" });
});

server.listen(3333, err => {
  if (err) console.log(err);
  console.log("server running on port 3333");
});
