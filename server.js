const express = require("express");
const cors = require("cors");
const db = require("../data/dbConfig.js");


const server = express();
const corsOptions = {
  credentials: true,
  origin: "http://localhost:3000"
};

server.use(express.json());
server.use(cors(corsOptions));

server.get("/", (req, res) => {
    res.send("This is working...");
  });


module.exports = {
    server,
  };
  