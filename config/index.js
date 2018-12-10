const express = require("express");
const logger = require("morgan");
const helmet = require("helmet");

const notes = require("../routes/notes");
const register = require("../routes/register");
const login = require("../routes/login");

module.exports = server => {
  server.use(express.json());
  server.use(helmet());
  server.use(logger("dev"));
  server.use("/api/notes", notes);
  server.use("/api/register", register);
  server.use("/api/login", login);
};
