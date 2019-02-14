const express = require("express");

const notes = require("../notes/notesModel");
const tags = require("../notes/tagsModel");

const server = express();

server.use(express.json());

server.get("/notes", (req, res) => {
  notes
    .fetch()
    .then(notes => {
      notes[0]
        ? res.json(notes)
        : res
            .status(400)
            .json({ error: "there are currently no notes in our directory" });
    })
    .catch(err => {
      res.status(500).json({ error: "could not retrieve notes" });
    });
});

server.get("/notes/:id", (req, res) => {
  const { id } = req.params;
  notes
    .fetch(id)
    .then(note => {
      if (note[0]) {
        res.json(note);
      } else {
        res.status(404).json({ error: "note does not exist" });
      }
    })
    .catch(err => {
      res.status(500).json({ error: "note could not be retrieved." });
    });
});

server.get("/notes/:id/tags", (req, res) => {
  const { id } = req.params;

  notes
    .fetch(id)
    .then(note => {
      if (note[0]) {
        tags.fetchTagsByNote(note[0].id).then(tags => {
          if (tags[0]) {
            res.json(tags);
          } else {
            res.status(404).json({ error: "note has no tags" });
          }
        });
      } else {
        res.status(404).json({ error: "note does not exist" });
      }
    })
    .catch(err => {
      res.status(500).json({ error: "note tags could not be retrieved." });
    });
});

server.get("/tags", (req, res) => {
  tags
    .fetch()
    .then(tags => {
      if (tags[0]) {
        res.json(tags);
      } else {
        res.status(404).json({ error: "thare are currently no tags in our directory" });
      }
    })
    .catch(err => {
      res.status(500).json({ error: "tags could not be retrieved." });
    });
});
server.get("/tags/:id", (req, res) => {
  const { id } = req.params;
  tags
    .fetch(id)
    .then(tag => {
      if (tag[0]) {
        res.json(tag[0]);
      } else {
        res.status(404).json({ error: "tag does not exist" });
      }
    })
    .catch(err => {
      res.status(500).json({ error: "tag could not be retrieved." });
    });
});

module.exports = server;
