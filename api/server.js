/* ===== dependencies ===== */
const express = require("express");
const cors = require("cors");
const knex = require("knex");
const knexConfig = require("../knexfile");

/* ===== Database ===== */
const db = knex(knexConfig.development);

/* ===== Route Imports ===== */
const notes = require("./notes");
/* ===== Server setup ===== */
const server = express();

server.use(express.json());
server.use(cors());

/* ===== Test Route ===== */
server.get("/", (req, res) => {
  res.json({ api: "up" });
});

server.use("/api/notes", notes);

module.exports = server;
