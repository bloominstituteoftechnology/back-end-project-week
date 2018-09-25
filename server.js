const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const db = require("./data/dbConfig.js");

const server = express();
const corsOptions = {
  credentials: true,
  origin: "http://localhost:3000"
};

server.use(express.json());
server.use(cors(corsOptions));
server.use(helmet());

//custom middleware

function checkForResource(req, res, resource) {
  if (resource.length > 0) {
    res.status(200).json(resource);
  } else {
    res
      .status(404)
      .json({ message: "The resource does not exist or is currently empty." });
  }
}

server.get("/", (req, res) => {
  res.send("This is working...");
});

server.get("/api/notes", (req, res) => {
  db("notes")
    .then(notes => {
      checkForResource(req, res, notes);
    })
    .catch(err => {
      console.log("error", err);
      res
        .status(500)
        .json({ error: "The notes information could not be retrieved." });
    });
});

server.get("/api/notes/:id", (req, res) => {
  const { id } = req.params;
  db("notes")
    .where({ id })
    .then(note => {
      checkForResource(req, res, note);
    })
    .catch(err => {
      console.log("error", err);
      res.status(500).json({ error: "The note could not be retrieved" });
    });
});

server.post("/api/notes", (req, res) => {
  const note = req.body;
  db.insert(note)
    .into("notes")
    .then(id => {
      console.log(id);
      db("notes")
        .then(notes => {
          res.status(201).json(notes);
        }) 
        .catch(err => {
          console.log("error", err);
          res
            .status(500)
            .json({ error: "The notes information could not be retrieved." });
        });
    })
    .catch(err => {
      console.log("error", err);
      res.status(500).json({
        error: "There was an error saving the note to the database."
      });
    });
});

server.put("/api/notes/:id", (req, res) => {
  const changes = req.body;
  const { id } = req.params;
  db("notes")
    .where({ id })
    .update(changes)
    .then(count => {
      console.log(count);
      db("notes")
        .then(notes => {
          res.status(200).json(notes);
        })
        .catch(err => {
          console.log("error", err);
          res.status(500).json({ error: "The notes could not be retrieved." });
        });
    })
    .catch(err => {
      console.log("error", err);
      res.status(500).json({ error: "The note could not be updated" });
    });
});

server.delete("/api/notes/:id", (req, res) => {
  const { id } = req.params;
  db("notes")
    .where({ id })
    .del()
    .then(count => {
        console.log(count);
        db("notes")
          .then(notes => {
            res.status(200).json(notes);
          })
          .catch(err => {
            console.log("error", err);
            res.status(500).json({ error: "The notes could not be retrieved." });
          });
    })
    .catch(err => {
      console.log("error", err);
      res.status(500).json({ error: "The note could not be deleted" });
    });
});

module.exports = {
  server
};
