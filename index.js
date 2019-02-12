const express = require("express");
const knex = require("knex");

const dbConfig = require("./knexfile");
const db = knex(dbConfig.development);
const PORT = 4700;
const server = express();

server.use(express.json());

server.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
