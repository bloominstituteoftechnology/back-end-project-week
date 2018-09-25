const express = require("express");
const helmet = require("helmet");
const knex = require("knex");

const dbConfig = require("./knexfile");

const db = knex(dbConfig.development);

const server = express();

server.use(helmet());
server.use(express.json());

server.get("/", (req, res) => {
  res.send("connected");
});

const port = 8000;
server.listen(port, function() {
  console.log(`\n=API ON ${port}=`);
});
