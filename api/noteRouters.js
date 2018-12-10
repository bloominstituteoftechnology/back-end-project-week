const express = require("express");
const router = express.Router();

const db = require("../database/helpers/notesModel");

// ====================== ENDPOINTS ======================
// GET notes
router.get("/", (_, res) => {
  db.get()
    .then(notes => {
      res.status(200).json(notes);
    })
    .catch(err => res.status(500).json({ message: "Error fetching", err }));
});

// GET note by id
router.get("/:id", (req, res) => {
  const { id } = req.params;

  db.get(id)
    .then(note => {
      if (!note) return res.status(404).json({ message: "Note Not Found" });
      res.status(200).json(note);
    })
    .catch(err => res.status(500).json({ message: "Error fetching", err }));
});

// POST new note
router.post("/create", (req, res) => {
  const newNote = req.body;

  db.insert(newNote)
    .then(id => {
      res.status(201).json({ message: `${id} created` });
    })
    .catch(err => res.status(500).json({ message: "Error posting", err }));
});

module.exports = router;
