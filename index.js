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

//============================================================================== Server Check <-----
server.get("/", (req, res) => {
  res.json({ api: "running" });
});
//============================================================================== Get All Notes <-----
server.get("/notes", (req, res) => {
  db("notes")
    .then(notes => {
      res.status(200).json(notes);
    })
    .catch(err => {
      res.status(500).json({ message: "Error fetching notes", error: err });
      console.error(err);
    });
});

//============================================================================== Get Note by ID <-----
server.get("/notes/:id", (req, res) => {
  db("notes")
    .where("id", req.params.id)
    .then(note => {
      res.status(200).json(note);
    })
    .catch(err => {
      res.status(500).json({ message: err });
      console.error(err);
    });
});
//============================================================================== Post Note <-----
server.post("/notes", (req, res) => {
  db("notes")
    .insert(req.body)
    .then(post => {
      res.status(200).json(post);
    })
    .catch(err => {
      res.status(500).json({ message: err });
      console.error(err);
    });
});

//============================================================================== Server Initialization <----
server.listen(9000, () => {
  console.log("\n Running on port 9000\n");
});
