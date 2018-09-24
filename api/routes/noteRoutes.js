const express = require("express");
const knex = require("knex");
const dbConfig = require("../knexfile");
const db = knex(dbConfig.development);
const router = express.Router();

// GET
router.get("/", (req, res) => {
    db("notes")
      .then(notes => {
        res.status(200).json(notes);
      })
      .catch(err => {
        res.status(500).json({ error: "The notes could not be retrieved." });
      });
  });
  
// GET BY ID
router.get("/:id", (req, res) => {
    const { id } = req.params;
    db("notes")
      .where({ id: id })
      .then(note => {
        if (note.length === 0) {
          res.status(404).json({
            message: "The note with the specified ID does not exist.",
          });
        } else {
          return res.status(200).json(note);
        }
      })
      .catch(err => {
        res.status(500).json({ error: "The note could not be retrieved." });
      });
  });
  // end

  module.exports = router;