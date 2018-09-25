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
    .then(notes => {
      res.status(200).json(notes);
    })
    .catch(err => {
      res.status(500).json({ errMsg: "Could not retrieve notes." });
    });
});

server.post("/api/create", (req, res) => {
  const newnote = req.body;
  db("notes")
    .insert(newnote)
    .then(ids => {
      const id = ids[0];

      db("notes")
        .where({ id })
        .first()
        .then(note => {
          res.status(201).json({ id: note.id });
        })
        .catch(err => res.status(500).send(err));
    })
    .catch(err => res.status(500).send(err));
});

server.get("/api/notes/:id", (req, res) => {
  const { id } = req.params;
  db("notes")
    .where({ id })
    .first()
    .then(note => {
      if (note) {
        res.status(200).json(note);
      } else {
        res.status(404).json({ errMsg: `That note doesn't exist!` });
      }
    })
    .catch(err =>
      res.status(500).json({ errMsg: "Could not retrieve notes." })
    );
});

server.put("/api/edit/:id", (req, res) => {
  const note = req.body;
  const { id } = req.params;
  db("notes")
    .where({ id })
    .update({ title: note.title, content: note.content })
    .into("notes")
    .then(note => {
      if (note) {
        res.status(200).json(note);
      } else {
        res.status(404).json({
          errMsg: `That note doesn't exist!`
        });
      }
    });
});

server.delete("/api/delete/:id", (req, res) => {
  const { id } = req.params;
  db("notes")
    .where({ id })
    .del()
    .then(note => {
      res.status(200).json(note);
    })
    .catch(err => res.status(500).json(err));
});

port = 8080;
server.listen(
  port,
  console.log(`\n ===> Server is running on port: ${port} <=== \n`)
);
