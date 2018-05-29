const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const config = require("./config.js");
const mongoose = require("mongoose");

const port = process.env.PORT || 3333;
const server = express();

mongoose
  .connect(
    `mongodb://${config.username}:${
      config.password
    }@ds139970.mlab.com:39970/cruise-notes`
  )
  .then(() => {
    console.log("connected to database");
  })
  .catch(err => {
    console.log("error connecting to database");
  });

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
