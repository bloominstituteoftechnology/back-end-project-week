const express = require("express");
const db = require("./notes-model");
const router = express.Router();

// GET a list of notes
router.get("/", (req, res) => {
  db.find()
    .then((notes) => res.status(200).json(notes))
    .catch((error) =>
      res.status(500).json({ message: "Could not get notes from server." })
    );
});

// GET a note by ID
router.get("/:id", (req, res) => {
  db.findByID(req.params.id)
    .then((note) => res.status(200).json(note))
    .catch((error) =>
      res.status(500).json({
        message: "Could not get note #" + req.params.id + " from server.",
      })
    );
});

// POST a note to the database
router.post("/", (req, res) => {
  db.add(req.body)
    .then((newNote) => {
      res.status(201).json(newNote[0]);
    })
    .catch((err) => res.status(500).json(err));
});

router.put("/:id", (req, res) => {
  db.update(req.params.id, req.body)
    .then((updatedNote) => res.status(200).json(updatedNote))
    .catch((err) => res.status(500).json(err));
});

router.delete("/:id", (req, res) => {
  db.remove(req.params.id)
    .then((count) => res.json(count))
    .catch((err) => res.status(500).json(err));
});

module.exports = router;
