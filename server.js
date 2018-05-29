const express = require("express");
const cors = require("cors");
const port = process.env.PORT || 3333;
const server = express();

server.use(express.json());
server.use(cors());

server.get("/", (req, res) => {
  res.json({ message: "all good homie" });
});

server.listen(port, err => {
  if (err) console.log(err);
  console.log(`server running on port ${port}`);
});
