const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const noteRoutes = require("../routes/noteRoutes.js");
// setting userRoutes up for later
// const userRoutes = require("../routes/usersRoutes.js");

module.exports = server => {
  server.use(helmet());
  server.use(cors());
  server.use(express.json());
  
  //route paths
  server.use("/note", noteRoutes);
};