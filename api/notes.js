const express = require("express");
const knex = require("knex");
const knexConfig = require("../knexfile");
const db = knex(knexConfig.development);
const router = express.Router();

/* ===== GET ALL NOTES  ===== */
router.get("/", (req, res) => {
  db("notes")
    .then(notes => {
      res.status(200).json(notes);
    })
    .catch(err => res.status(500).json(err));
});

/* ===== GET NOTES BY ID ===== */
router.get("/:id", (req, res) => {
  const { id } = req.params;
  db("notes")
    .first()
    .where("notes.id", id)
    .then(note => {
      res.status(200).json(note);
    })
    .catch(err => res.status(500).json(err));
});

/* ===== CREATE NOTE  ===== */
router.post("/", (req, res) => {
  const newNote = req.body;
  db("notes")
    .insert(newNote)
    .then(notes => {
      res.status(200).json(notes);
    })
    .catch(err => res.status(500).json(err));
});

/* ===== EDIT NOTE  ===== */
router.put("/:id", (req, res) => {
  const editedNote = req.body;
  const id = req.params.id;
  db("notes")
    .where("id", id)
    .update(editedNote)
    .then(note => {
      if (note) {
        res.status(200).json(note);
      } else {
        res.status(404).json({ error: "Note not found" });
      }
    })
    .catch(err => res.status(500).json(err));
});

/* ===== DELETE NOTE  ===== */
router.delete("/:id", (req, res) => {
  const id = req.params.id;
  db("notes")
    .where("id", id)
    .delete()
    .then(note => {
      if (note) {
        res.status(200).json(note);
      } else {
        res.status(404).json({ error: "Note not found" });
      }
    })
    .catch(err => res.status(500).json(err));
});
module.exports = router;
