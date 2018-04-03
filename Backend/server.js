const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const PORT = 5000;
const server = express();

server.use(bodyParser.json());

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/demoSchema');

server.get('/', (req, res) => {
  Schema.find({}, (err, database) => {
    if(err) {
      res.status(500);
      res.json(err);
    } else {
      res.json(database);
    }
  });
});

server.listen(PORT, err => {
  if(err) {
    console.log("You fucked up", err);
  } else {
    console.log(`The server is listening on port number: ${PORT}.`);
  }
})