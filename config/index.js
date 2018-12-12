const express = require("express");
const logger = require("morgan");
const helmet = require("helmet");
const cors = require("cors");

const notes = require("../routes/notes");
const register = require("../routes/register");
const login = require("../routes/login");

module.exports = server => {
  server.use(cors());
  server.disable("etag");
  server.use(express.json());
  server.use(helmet());
  server.use(express.static("public"));
  server.use(logger("dev"));
  server.use("/api/notes", notes);
  server.use("/api/register", register);
  server.use("/api/login", login);
};
