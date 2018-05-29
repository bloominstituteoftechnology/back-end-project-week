const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const server = express();
const port = process.env.PORT || 5000;

server.use(cors({}));

// mongoose
mongoose
  .connect("mongodb://localhost/lambda_notes")
  .then(mongo => {
    console.log("-- connected to mongo database --");
  })
  .catch(err => {
    console.log("!Error, trouble connecting to mongo DB!");
  });

server.get("/", (req, res) => {
  res.json({ Message: "API is working!" });
});

server.listen(port, err => {
  if (err) console.log(err);
  console.log(`Server running on port ${port}`);
});
