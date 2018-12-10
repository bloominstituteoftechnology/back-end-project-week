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
    .where("notes.id", id)
    .then(note => {
      res.status(200).json(note);
    })
    .catch(err => res.status(500).json(err));
});

module.exports = router;
