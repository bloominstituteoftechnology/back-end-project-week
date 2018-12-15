const express = require("express");
const knex = require("knex");
const cors = require("cors");
const Chatkit = require("@pusher/chatkit-server");

const notes = require("../note.js");

const knexConfig = require("../knexfile.js");
const dbEnvironment = process.env.DB_ENVIRONMENT || "development";
const db = knex(knexConfig[dbEnvironment]);

const server = express();
server.use(express.json());
server.use(cors());

const port = process.env.PORT || 5000;

const chatkit = new Chatkit.default({
  instanceLocator: "v1:us1:21d00c5d-26c3-4fc6-bbd7-d04636ec1a01",
  key:
    "e1b08adf-1f3b-4762-9026-81cd91714481:WBPVate90yByyhRYlQXfIH0CeVX+LqAMaj1eA72s9m8="
});

// server.get("/", (req, res) => {
//   res.send(`API running on port: ${port}`);
// });

server.post("/users", (req, res) => {
  const { username } = req.body;
  chatkit
    .createUser({
      id: username,
      name: username
    })
    .then(() => res.sendStatus(201))
    .catch(error => {
      if (error.error_type === "services/chatkit/user_already_exists") {
        res.sendStatus(200);
      } else {
        res.status(error.status).json(error);
      }
    });
});

server.post("/authenticate", (req, res) => {
  const authData = chatkit.authenticate({ userId: req.query.user_id });
  res.status(authData.status).send(authData.body);
});

server.get("/notes", (req, res) => {
  notes
    .getNotes()
    .then(note => {
      res.status(200).json(note);
    })
    .catch(error => {
      res.status(500).json({ error: "Cannot find the note" });
    });
});

server.post("/addNote", (req, res) => {
  const { title, content, id } = req.body;
  const note = { title, content };

  if (!note) {
    return res.status(422).send({
      Message: "Please provide Title and Content."
    });
  }

  notes
    .addNote(note)
    .then(ids => {
      res.status(201).json({
        title: note.title,
        content: note.content,
        id: ids[0]
      });
    })
    .catch(error => {
      res.status(405).json({ error: "Cannot add a new note." });
    });
});

server.get("/notes/:id", (req, res) => {
  const { id } = req.params;

  db("notes")
    .where({ id })
    .then(note => {
      if (note.length !== 0) {
        res.status(200).json({ note });
      } else {
        res
          .status(404)
          .json({ message: "The note with the specified ID does not exist" });
      }
    })
    .catch(error => {
      console.log(note);
      res.status(500).json({ error: "Cant get notes data" });
    });
});

server.delete("/notes/:id", (req, res) => {
  const { id } = req.params;

  db("notes")
    .where({ id })
    .del()
    .then(note => {
      res.status(200).json(note);
    })
    .catch(error => {
      res.status(500).json({ error: "Cant delete note" });
    });
});

server.put("/notes/:id", (req, res) => {
  const changes = req.body;
  const { id } = req.params;

  db("notes")
    .where({ id })
    .update(changes)
    .then(note => {
      res.status(200).json({ note });
    })
    .catch(error => {
      res.status(500).json({ error: "cannot update the note" });
    });
});

module.exports = server;
