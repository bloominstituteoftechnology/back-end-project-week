const cl = console.log;
const express = require("express");

const db = require("./middleware/helpers");
const PORT = 4700;
const server = express();

server.use(express.json());

server.get("/notes", (req, res) => {
  db.getNotes()
    .then(notes => {
      res.json(notes);
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

server.get("/notes/:id", (req, res) => {
  const { id } = req.params;
  db.getNotes(id)
    .then(note => {
      res.json(note);
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

server.post("/notes/create", (req, res) => {
  const note = req.body;
  db.addNote(note)
    .then(ids => {
      res.status(201).json(ids[0]);
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

server.delete("/notes/delete/:id", (req, res) => {
  const { id } = req.params;
  db.deleteNote(id)
    .then(count => {
      res.json(count);
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

server.put('/notes/edit/:id', (req, res) => {
  const {id} = req.params;
  const note = req.body;
  db.editNote(id, note).then(count => {
    if (count) {
      db.getNotes(id).then(note => {
        res.json(note)
      }).catch(err => {
        res.status(500).send(err)
      })
    } else {
      res.status(404).send("the selected note was not updated")
    }
  }).catch(err => {
    res.status(500).send(err)
  })
})

server.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
