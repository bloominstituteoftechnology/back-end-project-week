const express = require("express");
const cors = require("cors");
const server = express();
const notes = require("./helpers/index");


server.use(express.json());
server.use(cors());

server.get("/notes", (req, res) => {
  notes
    .getNotes()
    .then(notes => {
      res.status(200).json(notes);
    })
    .catch(err => {
      console.log("error", err);
      res.status(500).json({ message: "error fetching data" });
    });
});

server.get("/notes/:id", (req, res) => {
  notes
    .getNotes(req.params.id)
    .then(note => {
      res.status(200).json(note);
    })
    .catch(err => {
      console.log("error", err);
      res.status(500).json({ message: "error fetching data" });
    });
});

server.post("/notes", (req, res) => {
  notes
    .addNote(req.body)
    .then(note => {
      res.status(200).json(note);
    })
    .catch(err => {
      console.log("error", err);
      res.status(500).json({ message: "error posting data" });
    });
});

server.post("/tags/:id", (req, res) => {
    notes
      .addTag(req.body)
      .then(tag => {
        res.status(200).json(tag);
      })
      .catch(err => {
        console.log("error", err);
        res.status(500).json({ message: "error posting data" });
      });
  });

server.put("/notes/:id", (req, res) => {
  notes
    .editNote(req.params.id, req.body)
    .then(note => {
      res.status(200).json(note);
    })
    .catch(err => {
      console.log("error", err);
      res.status(500).json({ message: "error editing data" });
    });
});

server.delete("/notes/:id", (req, res) => {
  notes
    .deleteNote(req.params.id)
    .then(note => {
      res.status(200).json({ message: "note deleted" });
    })
    .catch(err => {
      console.log("error", err);
      res.status(500).json({ message: "error deleting data" });
    });
});

server.delete("/tags/:id", (req, res) => {
    notes
      .deleteTag(req.params.id)
      .then(tag => {
        res.status(200).json({ message: "note deleted" });
      })
      .catch(err => {
        console.log("error", err);
        res.status(500).json({ message: "error deleting data" });
      });
  });

server.listen(5000, () => {
  console.log(`\n Server listening on port 5000\n`);
});
