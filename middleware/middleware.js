"use strict";
// dependencies
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
// routes
const noteRoutes = require("../routes/noteRoutes.js");

function errorHandler(err, req, res, next) {
  switch (err.code) {
    case 404:
      res.status(404).json({
        message: "The note with the specified ID does not exist.",
      });
      break;
    case 400:
      res.status(400).json({
        message: "There was an error regarding your input.",
      });
    case 406:
      res.status(406).json({
        message: "Missing title or content.",
      });
    default:
      res.status(500).json({
        message: "There was an error performing the requested operation",
      });
      break;
  }
}

module.exports = server => {
  server.use(
    cors({
      credentials: true,
      origin: process.env.CORS_URL,
    }),
  );
  server.use(helmet());
  server.use(express.json());
  server.use(morgan("dev"));
  server.use("/api/notes", noteRoutes);
  server.use(errorHandler);
};
