const express = require("express");
const cors = require("cors");

const db = require("./db/dbConfig.js");

const server = express();

server.use(express.json());
server.use(cors());

// endpoints

// make a new note
server.post("/api/create", (req, res) => {
  console.log(req.body);
  const info = req.body;
  db("notes")
    .insert(info)
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

// see list of notes
server.get("/api/notes", (req, res) => {
  db("notes")
    .then(notes => {
      res.status(200).json(notes);
    })
    .catch(err => {
      res.status(500).json({ errMsg: "Database could not retrieve info" });
    });
});

// see specific note by id
server.get("/api/notes/:id", (req, res) => {
  const { id } = req.params;
  db("notes")
    .get(id)
    .then(notes => {
      if (notes) {
        res.status(200).json(notes);
      } else {
        res
          .status(404)
          .json({ errMsg: `The note with the id:${id} is not found` });
      }
    })
    .catch(err =>
      res.status(500).json({ errMsg: "Database could not retrieve info" })
    );
});

// edit note by id
server.put("/api/edit/:id", (req, res) => {
  db("notes")
    .where({ id: req.params.id })
    .update(req.body)
    .then(note => {
      res.status(201).json(note);
    })
    .catch(fail => {
      console.log(fail);
      res
        .status(404)
        .json({ message: "The note with the specified ID does not exist." });
    });
});

// delete note by id
server.delete("/api/delete/:id", (req, res) => {
  console.log(req.params.id, typeof req.params.id);
  const { id } = req.params;
  db("notes")
    .where({ id })
    .delete()
    .then(note => {
      res.status(201).json(note);
    })
    .catch(fail => {
      console.log(fail);
      res
        .status(404)
        .json({ message: "The note with the specified ID didn't delete." });
    });
});

server.listen(5000, () => console.log("\nrunning on port 5000\n"));
