const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const knex = require("knex");
const bcrypt = require("bcryptjs");

const dbConfig = require("./knexfile");

const db = knex(dbConfig.development);

const server = express();

server.use(express.json());
server.use(cors());
server.use(helmet());

server.get("/", (req, res) => {
  res.send("This server is fully operational.");
});

server.get("/api/notes", (req, res) => {
  db("notes")
    .select("id", "title", "body")
    .then(notes => {
      res.join(notes);
    })
    .catch(err => res.send(err));
});

server.listen(9000);
