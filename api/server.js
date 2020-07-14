/* ===== dependencies ===== */
const express = require("express");
const cors = require("cors");
const knex = require("knex");
const knexConfig = require("../knexfile");

/* ===== Database ===== */
const db = knex(knexConfig.development);

/* ===== Auth Middleware ===== */
const { authenticate } = require("./config/middlewares");

/* ===== Route Imports ===== */
const notes = require("./notes");
const register = require("./register");
const login = require("./login");
const users = require("./users");
/* ===== Server setup ===== */
const server = express();

server.use(express.json());
server.use(cors());

/* ===== Test Route ===== */
server.get("/", (req, res) => {
  res.json({ api: "up" });
});

/* ===== Notes Route ===== */
server.use("/api/notes", authenticate, notes);

/* ===== Register Route ===== */
server.use("/api/register", register);

/* ===== Users Route ===== */
server.use("/api/users", authenticate, users);

/* ===== Login Route ===== */
server.use("/api/login", login);

module.exports = server;
