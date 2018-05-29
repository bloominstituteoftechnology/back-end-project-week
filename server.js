const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const port = process.env.PORT || 3333;
const server = express();

server.use(cors({}));
server.use(express.json());
server.use(morgan("combined"));

server.get("/", (req, res) => {
  res.json({ Message: "Hello World" });
});

server.listen(port, err => {
  if (err) console.log(err);
  console.log(`Focus your attack on port ${port}`);
});
