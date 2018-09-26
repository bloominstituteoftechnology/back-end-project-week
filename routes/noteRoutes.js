const express = require("express");
const knex = require("knex");
const dbConfig = require("../knexfile");
const db = knex(dbConfig.development);
const router = express.Router();

// GET
router.get("/get/all", (req, res) => {
  db("notes")
    .then(notes => {
      res.status(200).json(notes);
    })
    .catch(err => {
      res.status(500).json({ error: "The notes could not be retrieved." });
    });
});

// GET BY ID
router.get("/get/:id", (req, res) => {
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
router.post("/create", (req, res) => {
  const note = req.body;
  if (!note.title || !note.textBody) {
    return res.status(400).json({
      errorMessage: "Please provide both a title and text body for the note."
    });
  } else {
    db("notes")
      .insert(note)
      .into("notes")
      .then(id => {
        console.log(id)
        res.status(201).json({ id: id });
      })
      .catch(err => {
        res.status(500).json({ error: "The note could not be added." });
      });
  }
});
// end

// PUT
router.put("/edit/:id", (req, res) => {
  const { id } = req.params;
  const updatedNote = req.body;
  if (!updatedNote.title || !updatedNote.textBody) {
    return res.status(400).json({
      errorMessage: "Please provide a title and text body for the note."
    });
  } else {
    db("notes")
      .where({ id })
      .update({
        title: updatedNote.title,
        textBody: updatedNote.textBody
      })
      .then(response => {
        console.log(response)
        console.log(id)
        res.status(200).json({ ...updatedNote, id: id });
      })
      .catch(err => {
        res.status(500).json({ error: "The note could not be updated." });
      });
  }
});
// end

// DELETE
router.delete("/delete/:id", (req, res) => {
  const { id } = req.params;
  db("notes")
    .where("id", id)
    .del()
    .then(notes => {
      if (notes === 0) {
        res.status(404).json({
          message: "The note with the specified ID does not exist."
        });
      } else {
        res.status(200).json({ message: "Note removed successfully." });
      }
    })
    .catch(err => {
      res.status(500).json({ error: "The note could not be removed." });
    });
});
// end

module.exports = router;
