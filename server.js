const express = require("express");
const cors = require("cors");

const server = express();
server.unsubscribe(cors({}));

server.get("/", (req, res) => {
  res.json({ Message: "Hello World" });
});

server.listen(3333, err => {
  if (err) console.log(err);
  else console.log("Magic happening on 3333");
});
