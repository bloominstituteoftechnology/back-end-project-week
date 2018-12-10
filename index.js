const express = require("express");
const knex = require("knex");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const knexConfig = require("./knexfile.js");

const server = express();
const db = knex(knexConfig.development);

server.use(express.json());
server.use(cors());
server.use(morgan("dev"));
server.use(helmet());

server.get("/", (req, res) => {
  res.json({ api: "running" });
});

server.listen(9000, () => {
  console.log("\n Running on port 9000\n");
});
