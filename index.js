const express = require("express");
const knex = require("knex");
const cors = require("cors");

const knexConfig = require("./knexfile.js");

const db = knex(knexConfig.development);

const server = express();

server.use(express.json());
server.use(cors());

server.listen(9000, console.log("port 9000 is allliiiivvvvveeeee!!!"));