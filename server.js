const express = require("express");
const cors = require("cors");

const port = process.env.PORT || 3333;

const server = express();

server.use(express.json());
server.use(cors({}));

server.get("/", (req, res) => {
  res.json({ Message: "Hello World" });
});

server.listen(port, err => {
  if (err) console.log(err);
  else console.log(`Magic happening on ${port}`);
});
