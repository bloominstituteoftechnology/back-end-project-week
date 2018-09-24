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
          message: "The note with the specified ID does not exist."
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

// POST
router.post("/", (req, res) => {
  const note = req.body;
  if (!note) {
    return res.status(406).json({
      errorMessage: "Please provide a title for the note."
    });
  } else {
    db("notes")
      .insert(note)
      .into("notes")
      .then(notes => {
        res.status(201).json({ message: "Note successfully added." });
      })
      .catch(err => {
        res.status(500).json({ error: "The note could not be added." });
      });
  }
});
// end POST

// PUT
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const updatedNote = req.body;
  if (!updatedNote) {
    return res.status(406).json({
      errorMessage: "Please provide a title for the note."
    });
  } else {
    db("notes")
      .where("id", id)
      .update({
        title: updatedNote.title,
        textBody: updatedNote.textBody
      })
      .then(notes => {
        res.status(200).json({ message: "Note successfully modified." });
      })
      .catch(err => {
        res.status(500).json({ error: "The note could not be updated." });
      });
  }
});
// end PUT

// DELETE
router.delete("/:id", (req, res) => {
    const { id } = req.params;
    db("notes")
      .where("id", id)
      .del()
      .then(notes => {
        if (notes === 0) {
          res.status(404).json({
            message: "The note with the specified ID does not exist.",
          });
        } else {
          res.status(200).json({ message: "Note removed successfully." });
        }
      })
      .catch(err => {
        res.status(500).json({ error: "The note could not be removed." });
      });
  });
  // end DELETE

module.exports = router;
