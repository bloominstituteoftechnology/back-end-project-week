const express = require("express");
const cors = require("cors");
const configureRoutes = require("./config/routes.js");

const server = express();

var whitelist = [
  "http://localhost:5500/api/all",
  "http://localhost:5500/api/create",
  "http://localhost:5500/api/view/:id",
  "http://localhost:5500/api/edit/:id",
  "http://localhost:5500/api/delete/:id"
];
const corsOptions = {
  origin: function(origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  }
};

server.use(express.json());
server.use(cors());

configureRoutes(server);

module.exports = {
  server,
  corsOptions
};
