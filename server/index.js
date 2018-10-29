const express = require("express");
const helmet = require("helmet");
const knex = require("knex");
const knexConfig = require("./knexfile.js");
const db = knex(knexConfig.development);
const server = express();
const port = 3300;
const cors = require("cors");

server.use(helmet());
server.use(cors());
server.use(express.json());

server.listen(port, () => {
	console.log(`Server now listening on Port ${port}`);
});
